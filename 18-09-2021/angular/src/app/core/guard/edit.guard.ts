import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user-management";

@Injectable({
  providedIn: "root"
})
export class EditGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const getUserDetails = this.auth.getUserDetails();
    const role = getUserDetails.role;
    if (role.createDocument && role.updateDocument)
      return true
    this.router.navigate(["home"])
    return false;
  }

}
