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
        if(error.status==0){
          Swal.fire({
            title: 'Sin conexión con la API',
            text: 'Contacta al adminstrador',
            icon: 'error',
            confirmButtonText: 'Ok'
          })

          return throwError(()=>console.error(error));
        }
        Swal.fire({
          title: error.error.message ? error.error.message : error.error,
          text: '',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
       // this.toastr.error(`${error.error.error}`,'Ups, hubo un problema' );
        return throwError(()=>console.error(error));
      })
    )
  }
}
