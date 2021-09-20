import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogService } from "../../service/dialog.service";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent {

  public negButton!: string;
  public posButton!: string;
  public question!: string

  constructor(
    private matDialog: MatDialogRef<DialogComponent>,
    private dialog: DialogService
  ) {
    this.negButton = this.dialog.noButton
    this.posButton = this.dialog.yesButton
    this.question = this.dialog.question
  }

  closeDialog() {
    this.matDialog.close()
  }
}
