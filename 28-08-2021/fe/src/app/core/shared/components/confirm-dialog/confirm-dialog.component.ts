import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  negButton!:string ;
  posButton!:string;
  question!:string

  constructor(private matDialog: MatDialogRef<ConfirmDialogComponent>, private dialog: DialogService) {
    this.negButton = this.dialog.noButton
    this.posButton = this.dialog.yesButton
    this.question = this.dialog.question
   }

  ngOnInit(): void {
  }

  closeDialog(){
    this.matDialog.close()
  }

}
