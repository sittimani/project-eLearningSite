import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "src/app/user-management";

@Injectable({
  providedIn: "root"
})
export class CreateGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const userDetails = this.auth.getUserDetails()
    const role = userDetails.role;
    if (role.createCourse && role.deleteCourse)
      return true
    this.router.navigate(["home"])
    return false;
  }

}
