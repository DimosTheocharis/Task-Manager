import { ApiService, ApplicationUser } from './../Services/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser: ApplicationUser | null = this.apiService.getCurrentUserValue();

    if (currentUser) {
      // maybe the token exists but has expired
      const isTokenExpired: boolean = this.apiService.isTokenExpired(currentUser.token);
      if (isTokenExpired) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // if user tries to access links that require
      // to be authorized, then the auth guard holds the url and then redirects to the login page. 
      return false;
    }
  }

}