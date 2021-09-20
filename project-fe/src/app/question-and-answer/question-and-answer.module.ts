import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { QaFormComponent, QaDashboardComponent, QuestionAndAnswerRoutingModule } from ".";


@NgModule({
  declarations: [
    QaFormComponent,
    QaDashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    QuestionAndAnswerRoutingModule
  ]
})
export class QuestionAndAnswerModule { }
