import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { TopicManagementRoutingModule } from './topic-management-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';

@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent,
    CourseComponent,
    TopicFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TopicManagementRoutingModule
  ]
})
export class TopicManagementModule { }
