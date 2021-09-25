import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  CourseFormComponent,
  CourseListComponent,
  CourseManagementRoutingModule,
  DashboardComponent
} from ".";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CourseManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourseManagementModule { }
