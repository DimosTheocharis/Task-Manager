import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, tap, catchError } from "rxjs";
import { LoginUserDto } from '../shared/Dtos/loginUser';
import { RegisterUserDto } from '../shared/Dtos/registerUser';
import { jwtDecode } from 'jwt-decode';

export interface ApplicationUser {
  token: string,
  username: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token!: string;
  private currentUserSubject!: BehaviorSubject<ApplicationUser | null>;
  private currentUser!: ApplicationUser | null;

  private sessionTimeLeftSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private sessionTimeLeftIntervalID!: NodeJS.Timer;
  private sessionDuration: number = 0; // how many seconds the user can be logged in

  private apiUrl: string = "http://localhost:3000/api";

  constructor(
    private http: HttpClient,
  ) {

    // fetch user from localstorage
    const user: string | null = localStorage.getItem("user");
    if (user) {
      this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(
        JSON.parse(user)
      )
      this.currentUser = JSON.parse(user);
      this.token = JSON.parse(user).token;

      // decode user token and save useful information about user's session
      const decodedToken = jwtDecode(this.token);
      if (decodedToken && decodedToken.exp && decodedToken.iat) {
        this.sessionDuration = decodedToken.exp - decodedToken.iat;
        this.sessionTimeLeftSubject.next(decodedToken.exp - Date.now() / 1000);

        this.startTimer(decodedToken.exp);
      }
    } else {
      this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(null);
      this.currentUser = null;
      this.token = "";
    }
  }

  login(loginUserDto: LoginUserDto): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>(`${this.apiUrl}/auth/login`, loginUserDto).pipe(
      map((loginUser: ApplicationUser) => {

        if (loginUser && loginUser.token) {
          localStorage.setItem("user", JSON.stringify(loginUser));
          this.currentUserSubject.next(loginUser);
          this.currentUser = loginUser;

          // decode the token and save the expiration in local variable
          const decodedToken = jwtDecode(loginUser.token);
          if (decodedToken && decodedToken.exp && decodedToken.iat) {
            this.sessionDuration = decodedToken.exp - decodedToken.iat;
            this.sessionTimeLeftSubject.next(decodedToken.exp - Date.now() / 1000);

            this.startTimer(decodedToken.exp);
          }


          this.token = loginUser.token;
        }
        return loginUser;
      }),
      catchError(error => {
        console.error(error);
        throw error;
      })
    )
  }

  register(registerUserDto: RegisterUserDto) {
    return this.http.post(`${this.apiUrl}/auth/register`, registerUserDto).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })

    )
  }

  public logout() {
    this.sessionTimeLeftSubject.next(0);
    clearInterval(this.sessionTimeLeftIntervalID);

    this.currentUserSubject.next(null);
    this.currentUser = null;

    this.token = "";
    localStorage.removeItem('user');
  }

  /**
   * Sets the timer by creating an interval running every 1 second which decreases the time left
   * @param expirationTime he user's session time expiry in seconds
   */
  private startTimer(expirationTime: number): void {
    this.sessionTimeLeftIntervalID = setInterval(() => {
      this.sessionTimeLeftSubject.next(expirationTime - Date.now() / 1000);
      if (Date.now() / 1000 >= expirationTime) {
        clearInterval(this.sessionTimeLeftIntervalID);
      }
    }, 200);
  }

  /**
   * Computes and returns how much time is left for user's session expiry in percentage based on session's duration
   * @param timeLeft how much time is left in seconds
   */
  public computeSessionTimeLeftInPercentage(timeLeft: number): number {
    return timeLeft * 100 / this.sessionDuration;
  }


  public getCurrentUserValue(): ApplicationUser | null {
    return this.currentUser;
  }

  /**
   * @returns An observable that emits values about the logged-in-user
   */
  public getCurrentUserObservable(): Observable<ApplicationUser | null> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * @returns An observable that emits values about how much time is left for the user's session to expire, in seconds
   */
  public getSessionTimeLeftObservable(): Observable<number> {
    return this.sessionTimeLeftSubject.asObservable();
  }

  public isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp < Date.now() / 1000;
    }
    return true;
  }
}