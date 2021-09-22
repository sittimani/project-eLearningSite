import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/shared/service/dialog.service";
import {
  ProfessorData,
  UpdatePermission,
  userAuth,
  UserInformation,
  UserProfileService
} from "src/app/user-management";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  public isNoUser = false;
  public dataForApproval: ProfessorData[] = [];

  constructor(
    private dialog: DialogService,
    private user: UserProfileService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPendingProfessor()
  }

  private getPendingProfessor(): void {
    this.dataForApproval = [];
    this.isNoUser = true;
    this.user.getPendingProfessor().subscribe((response: userAuth[]) => {
      const count: number = response.length;
      if (count !== 0) {
        this.isNoUser = false;
        response.forEach((element: userAuth) => {
          this.user.getUserData(element._id).subscribe((response: UserInformation) => {
            this.dataForApproval.push(this.formatDataToDisplay(response, element));
          })
        })
      }
    })
  }

  public formatDataToDisplay(temp: UserInformation, element: userAuth): ProfessorData {
    return {
      name: temp.name,
      email: element.email,
      _id: element._id,
      workingAt: temp.workingAt
    };
  }

  public approve(id: string) {
    let value: UpdatePermission = {
      id: id,
      verified: "pending"
    };
    this.dialog.setDetails("Approve", "Deny", "Select button to update user status?");
    this.dialog.openDialog().afterClosed().subscribe((choice: boolean) => {
      value["verified"] = choice ?  "approved" : choice === false ? "denied" : "pending";
      if (value["verified"] !== "pending")
        this.updateStatus(value);
    })
  }

  private updateStatus(value: UpdatePermission) {
    this.user.userPermission(value).subscribe((response: string) => {
      this.toastr.success(response, "Success");
      this.getPendingProfessor();
    })
  }
}
