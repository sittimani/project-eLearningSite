import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/user-management/shared/service/auth.service";
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
      this.auth.logOut()
      this.auth.loggedIn();
      this.router.navigate(["login"])
      return false;
    }
  }

  checkPermission(): boolean {
    if (this.checkRoutePermission()) {
      this.auth.loggedIn();
      return true;
    }
    this.toastr.warning("You dont't have access to this url !!!", "Warning")
    this.router.navigate(["home"])
    return false;
  }

  checkRoutePermission() {
    const role = this.auth.getUserDetails().role;
    if (role.createCourse && role.deleteCourse) {
      return true
    } else if (role.updateDocument && role.createDocument) {
      return this.checkProfessorRoute()
    } else {
      return this.checkStudentRoute()
    }

  }
  checkProfessorRoute(): boolean {
    const route = location.href;
    let hasPermission = true;
    routes.adminRoutes.forEach((path: string) => {
      if (route.includes(path))
        hasPermission = false
    })
    return hasPermission
  }

  checkStudentRoute(): boolean {
    const route = location.href;
    let hasPermission = true;
    routes.adminRoutes.forEach((path: string) => {
      if (route.includes(path))
        hasPermission = false
    })
    routes.professorRoutes.forEach((path: string) => {
      if (route.includes(path))
        hasPermission = false
    })
    return hasPermission;
  }
}
