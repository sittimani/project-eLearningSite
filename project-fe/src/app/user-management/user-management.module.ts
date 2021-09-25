import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { PasswordComponent } from "./components/password/password.component";
import { RegisterComponent } from "./components/register/register.component";

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
