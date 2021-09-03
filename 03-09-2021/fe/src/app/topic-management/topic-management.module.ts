import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicComponent } from './components/topic/topic.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicManagementRoutingModule } from './topic-management-routing.module';



@NgModule({
  declarations: [
    TopicFormComponent,
    TopicComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TopicManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TopicManagementModule { }
