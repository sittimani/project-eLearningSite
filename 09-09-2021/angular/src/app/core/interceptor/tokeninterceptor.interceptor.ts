import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { LoaderService } from '../shared/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private loader: LoaderService,
    private toastr: ToastrService,
    private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loader.isLoading.next(true)

    let tokenizedreq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(tokenizedreq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loader.isLoading.next(true)
        this.getErrorMessage(error)
        return throwError(error)
      }),
      finalize(
        () => {
          this.loader.isLoading.next(false)
        }
      )
    );
  }

  getErrorMessage(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.router.navigate(['internalserverproblem'])
    } else if (error.status === 401 && error.error.data === "Invalid token") {
      this.auth.logOut()
      this.toastr.error("Unauthorized access, Please login to Continue!!!")
      
    } else {
      this.toastr.error(error.error.data, "Error")
    }
  }
}
