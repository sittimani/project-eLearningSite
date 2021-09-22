import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent, RegisterComponent, PasswordComponent } from ".";
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
