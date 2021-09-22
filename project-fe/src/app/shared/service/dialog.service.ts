import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "..";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  public yesButton = "";
  public noButton = "";
  public question = "";

  constructor(private dialog: MatDialog) { }

  openDialog() {
    return this.dialog.open(DialogComponent, {
      width: "390px",
      panelClass: "confirm-dialog-cotainer",
      disableClose: true
    })
  }

  setDetails(yes: string, no: string, question: string) {
    this.yesButton = yes;
    this.noButton = no;
    this.question = question;
  }
}
