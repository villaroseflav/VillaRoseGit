import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class ToastInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("INTERCEPTING ...............", req.url); //todo
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // todo test and update
                // If error response, show error toast
                if (error.status === 0) {
                    this.toastService.showError('Backend is offline. Please check your connection');
                } else if (error.status === 404) {
                    this.toastService.showError('Resource not found.');
                } else if (error.status === 500) {
                    this.toastService.showError('Internal server error. Please try again later.');
                } else {
                    this.toastService.showError(error.message || 'An unknown error occurred.');
                }
                console.log("SHOWING ERROR TOAST"); //todo debug

                // Re-throw the error so it can be handled by the service if necessary
                return throwError(() => error);
            }),
            tap((event: HttpEvent<any>) => {
                // If the response is successful, show success toast
                if (event instanceof HttpResponse) {
                    this.toastService.showSuccess('Request completed successfully!');
                }
            })
        );
    }
}