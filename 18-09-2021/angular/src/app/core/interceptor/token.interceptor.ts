import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators"
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/user-management";
import { LoaderService } from "..";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private loader: LoaderService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.isLoading.next(true)

    let modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loader.isLoading.next(true)
        this.toastErrorMessage(error)
        return throwError(error)
      }),
      finalize(
        () => {
          this.loader.isLoading.next(false)
        }
      )
    );
  }

  private toastErrorMessage(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.router.navigate(["internalserverproblem"])
    } else if (error.status === 401 && error.error === "Invalid token") {
      this.auth.logOut()
      this.toastr.error("Unauthorized access, Please login to Continue!!!")
    } else {
      this.toastr.error(error.error, "Error")
    }
  }
}
