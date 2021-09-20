import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  TopicComponent,
  TopicFormComponent,
  TopicManagementRoutingModule
} from ".";


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
