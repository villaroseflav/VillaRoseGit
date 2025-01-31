/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ToastInterceptor } from './app/core/interceptors/toast.interceptor';
import { Observable, tap } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideAngularSvgIcon } from 'angular-svg-icon';

// todo clean imports

// const requestInterceptor: HttpInterceptorFn = (req, next) => {

//   console.log('request', req.method, req.url);
//   console.log('authInterceptor')

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       // todo test and update
//       // If error response, show error toast
//       if (error.status === 0) {
//         this.toastService.showError('Backend is offline. Please check your connection');
//       } else if (error.status === 404) {
//         this.toastService.showError('Resource not found.');
//       } else if (error.status === 500) {
//         this.toastService.showError('Internal server error. Please try again later.');
//       } else {
//         this.toastService.showError(error.message || 'An unknown error occurred.');
//       }
//       console.log("SHOWING ERROR TOAST"); //todo debug

//       // Re-throw the error so it can be handled by the service if necessary
//       return throwError(() => error);
//     }),
//     tap((event: HttpEvent<any>) => {
//       // If the response is successful, show success toast
//       if (event instanceof HttpResponse) {
//         this.toastService.showSuccess('Request completed successfully!');
//       }
//     })
//     // tap(resp => console.log('response', resp))
//   );
// }

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      // withInterceptors([
        // requestInterceptor https://stackoverflow.com/questions/77624853/interceptor-not-intercepting-in-angular-17
      // ]),
      withInterceptorsFromDi()
    ),
    provideAngularSvgIcon(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastInterceptor,
      multi: true,
    }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
})
.catch((err) => console.error(err));

