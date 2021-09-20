import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent, RegisterComponent, PasswordComponent } from ".";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }, {
    path: "register",
    component: RegisterComponent
  }, {
    path: "login",
    component: LoginComponent
  }, {
    path: "update-profile/:id",
    canActivate: [AuthGuard],
    component: RegisterComponent
  }, {
    path: "resetpassword",
    canActivate: [AuthGuard],
    component: PasswordComponent
  }, {
    path: "forgotpassword",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
