import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { QaService } from "../..";


@Component({
  selector: "app-qa-form",
  templateUrl: "./qa-form.component.html",
  styleUrls: ["./qa-form.component.css"]
})
export class QaFormComponent {

  public userValue = "";
  public isQuestionForm = false;
  
  constructor(
    private matDialog: MatDialogRef<QaFormComponent>,
    private inputDialog: QaService
  ) {
    this.isQuestionForm = this.inputDialog.isQuestionForm;
  }

  public closeDialog(): void {
    this.matDialog.close();
  }

  public submitQuestion(): void {
    this.inputDialog.question = this.userValue;
  }

  public submitAnswer(): void {
    this.inputDialog.answer = this.userValue;
  }

}
