import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QaFormComponent } from "./components/qa-form/qa-form.component";
import { QaDashboardComponent } from "./components/qa-dashboard/qa-dashboard.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { QuestionAndAnswerRoutingModule } from "./question-and-answer-routing.module";


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
