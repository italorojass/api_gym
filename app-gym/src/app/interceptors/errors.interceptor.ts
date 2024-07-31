import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router : Router,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Ups, hubo un problema!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
       // this.toastr.error(`${error.error.error}`,'Ups, hubo un problema' );
        return throwError(()=>console.error(error));
      })
    )
  }
}
