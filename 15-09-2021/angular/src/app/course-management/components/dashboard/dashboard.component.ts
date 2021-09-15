import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, ProfessorData, Roles } from 'src/app/core';
import { AuthService, UserProfileService } from 'src/app/user-management';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  public isNoUser: boolean = false;
  private responseData: any;
  public role!: Roles;
  public dataForApproval: ProfessorData[] = [];

  constructor(
    private auth: AuthService,
    private dialog: DialogService,
    private router: Router,
    private user: UserProfileService,
    private toastr: ToastrService
  ) {

    this.responseData = this.auth.getUserDetails();
    if (this.responseData) {
      this.role = this.responseData.role;
      if (!this.role.createCourse) {
        this.router.navigate(['home']);
      }
    }
    this.getPendingProfessor()
  }

  getPendingProfessor() {
    this.dataForApproval = []
    this.user.getPendingProfessor().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      if (this.responseData.length !== 0) {
        this.responseData.forEach((element: any) => {
          this.user.getUserData(element._id).subscribe(x => {
            const temp: any = x;
            this.dataForApproval.push(this.formatDataToDisplay(temp.data, element));
          })
        })
      } else {
        this.isNoUser = true;
      }
    })
  }

  formatDataToDisplay(temp: any, element: any) {
    const value = {
      name: temp.name,
      email: element.email,
      _id: element._id,
      workingAt: temp.workingAt
    };
    return value;
  }

  approve(id: string) {
    var value: any = {
      id: id
    };
    this.dialog.setDetails("Approve", "Deny", "Select button to update user status?");
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x) {
        value['verified'] = 'approved';
      } else if (x === false) {
        value['verified'] = 'denied';
      } else {
        value['verified'] = 'pending';
      }
      this.user.userPermission(value).subscribe(x => {
        this.responseData = x;
        this.toastr.success(this.responseData.data, "Success");
        this.getPendingProfessor();
      })
    })
  }
}
