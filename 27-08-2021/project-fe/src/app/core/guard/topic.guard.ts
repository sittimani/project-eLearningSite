import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopicGuard implements CanActivate {
  private responseData!: any
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot) {
      this.auth.verifyToken().subscribe(x => {
        this.responseData = x;
        this.responseData = this.responseData.users.role;
        if (this.responseData.createDocument && this.responseData.updateDocument) {
          return true;
        } else {
          this.router.navigate(['home'])
          return false;
        }
      })
      return false;
  }
 
}
