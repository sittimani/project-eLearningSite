import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QaService } from '../..';


@Component({
  selector: 'app-qa-form',
  templateUrl: './qa-form.component.html',
  styleUrls: ['./qa-form.component.css']
})
export class QaFormComponent {

  public userValue: string = '';
  public isQuestionForm: boolean;
  
  constructor(
    private matDialog: MatDialogRef<QaFormComponent>,
    private inputDialog: QaService
  ) {

    this.isQuestionForm = this.inputDialog.isQuestionForm;
  }

  closeDialog() {
    this.matDialog.close();
  }

  submitQuestion() {
    this.inputDialog.question = this.userValue;
  }

  submitAnswer() {
    this.inputDialog.answer = this.userValue;
  }

}
