import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  yesButton = ''
  noButton = ''
  question = ''

  constructor(private dialog:MatDialog) { }

  openDialog(){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      panelClass:'confirm-dialog-cotainer',
      disableClose: true
    })
  }

  setDetails(yes:string, no:string, question:string){
    this.yesButton = yes;
    this.noButton = no;
    this.question = question
  }
}
