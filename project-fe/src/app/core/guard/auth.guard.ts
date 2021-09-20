import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "src/app/user-management/shared/service/auth.service";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.getToken() && this.auth.getUserDetails()) {
      this.auth.loggedIn();
      return true;
    } else {
      this.auth.logOut()
      this.router.navigate(["login"])
      return false;
    }
  }

}
