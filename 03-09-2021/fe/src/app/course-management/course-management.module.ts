import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseManagementRoutingModule } from './course-management-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';



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
