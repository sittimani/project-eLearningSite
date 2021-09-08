import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { LoaderService } from '../shared/service/loader.service';

@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private loader: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loader.isLoading.next(true)

    let tokenizedreq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(tokenizedreq).pipe(
      finalize(
        () => {
          this.loader.isLoading.next(false)
        }
      )
    );
  }
}
