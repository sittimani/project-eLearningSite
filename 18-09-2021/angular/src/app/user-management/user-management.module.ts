import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PasswordComponent } from "./components/password/password.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserManagementRoutingModule } from "./user-management-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
