import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseManagementRoutingModule } from './course-management-routing.module';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { DashboardComponent } from '../topic-management/components/dashboard/dashboard.component';
import { ConfirmDialogComponent } from '../core/shared/components/confirm-dialog/confirm-dialog.component';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';


@NgModule({
  declarations: [
    CourseFormComponent,
    DashboardComponent,
    DeleteCourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CourseManagementRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger"
    })
  ],
  entryComponents:[ConfirmDialogComponent]
})
export class CourseManagementModule { }
