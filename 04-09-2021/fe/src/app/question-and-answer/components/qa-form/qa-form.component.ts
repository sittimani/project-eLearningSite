import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QaService } from '../../shared/service/qa.service';

@Component({
  selector: 'app-qa-form',
  templateUrl: './qa-form.component.html',
  styleUrls: ['./qa-form.component.css']
})
export class QaFormComponent implements OnInit {

  userValue = ''
  isQuestionForm:boolean;
  constructor(
    private matDialog: MatDialogRef<QaFormComponent>,
    private inputDialog: QaService) {
      this.isQuestionForm = 
      this.inputDialog.isQuestionForm
     }

  ngOnInit(): void {
  }

  closeDialog(){
    this.matDialog.close()
  }

  submitQuestion(){
    this.inputDialog.question = this.userValue;
  } 

  submitAnswer(){
    this.inputDialog.answer = this.userValue;
  }
  
}
