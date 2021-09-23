import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/user-management";
import { routes } from "../shared/config/routes";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(): boolean {
    if (this.auth.getToken() && this.auth.getUserDetails()) {
      return this.checkPermission();
    } else {
      this.auth.logOut();
      this.auth.loggedIn();
      this.router.navigate(["login"]);
      return false;
    }
  }

  private checkPermission(): boolean {
    if (this.checkRoutePermission()) {
      this.auth.loggedIn();
      return true;
    }
    this.toastr.warning("You dont't have access to this url !!!", "Warning");
    this.router.navigate(["home"]);
    return false;
  }

  private checkRoutePermission() {
    const role = this.auth.getUserDetails().role;
    if (role.createCourse && role.deleteCourse)
      return true;
    else if (role.updateDocument && role.createDocument)
      return this.checkProfessorRoute();
    return this.checkStudentRoute();
  }

  private checkProfessorRoute(): boolean {
    return this.isRoutePresent(routes.adminRoutes)
  }

  private checkStudentRoute(): boolean {
    let hasPermission = true;
    hasPermission = this.isRoutePresent(routes.adminRoutes);
    hasPermission = this.isRoutePresent(routes.professorRoutes);
    return hasPermission;
  }

  private isRoutePresent(routes: string[]) {
    const path = location.href;
    let hasPermission = true;
    routes.forEach((route: string) => {
      if (path.includes(route))
        hasPermission = false;
    })
    return hasPermission;
  }
}
