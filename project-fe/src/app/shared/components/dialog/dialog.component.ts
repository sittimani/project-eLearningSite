import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogService } from "../../service/dialog.service";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent {

  public negativeButton!: string;
  public positiveButton!: string;
  public question!: string;

  constructor(
    private matDialog: MatDialogRef<DialogComponent>,
    private dialog: DialogService
  ) {
    this.negativeButton = this.dialog.noButton;
    this.positiveButton = this.dialog.yesButton;
    this.question = this.dialog.question;
  }

  public closeDialog() {
    this.matDialog.close()
  }
}
