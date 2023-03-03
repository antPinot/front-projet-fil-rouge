import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, 
            next: HttpHandler
            ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err : HttpErrorResponse) =>{
        let errMessage = '';
        if (err.error instanceof ErrorEvent){
          errMessage = `Erreur : ${err.error.message}`;
        } else {
          errMessage = `Code erreur : ${err.status}\nMessage: ${err.message}`;
        }
        console.log(errMessage);
        return throwError(() => new Error(errMessage));
      })
    )
  }
}
