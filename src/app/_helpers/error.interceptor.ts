import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private notifyService:NotificationService,
        private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // debugger;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.notifyService.showError("Ezynaukari says!","Token expired please try logging in again.")
                location.reload(true);
            }
            
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}