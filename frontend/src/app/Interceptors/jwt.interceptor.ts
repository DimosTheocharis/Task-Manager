import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService, ApplicationUser } from './../Services/api.service';
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser: ApplicationUser | null = this.apiService.getCurrentUserValue();

        if (currentUser && currentUser.token) {
            const decodedToken = jwtDecode(currentUser.token);
            if (decodedToken && decodedToken.exp) {
                if (decodedToken.exp < Date.now() / 1000) {
                    this.toastr.error("Your session has expired! Please log in again!", "Session Expiration Erorr", { timeOut: 2000 }).onHidden.subscribe(
                        () => {
                            this.apiService.logout();
                            this.router.navigateByUrl("/login");
                        }
                    )
                    return EMPTY;
                }

            }

            // add authorization header with jwt token if available    
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}

// defines an Angular Provider for this interceptor. Providing this interceptor in app.module we ensure that any request 
// sent in backend has an Authorization header
export const jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
