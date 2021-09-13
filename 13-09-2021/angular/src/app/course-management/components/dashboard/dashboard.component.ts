import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core';
import { AuthService, UserProfileService } from 'src/app/user-management';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isNoUser: boolean = false;
  private responseData: any
  public role: any = {
    createCourse: false
  }
  public dataForApproval: any = []

  constructor(
    private auth: AuthService,
    private dialog: DialogService,
    private router: Router,
    private user: UserProfileService,
    private toastr: ToastrService) {

    this.auth.loggedIn()
    this.responseData = this.auth.getUserDetails()
    this.role = this.responseData.role;
    if (!this.role.createCourse) {
      this.router.navigate(['home'])
    }
  }

  ngOnInit(): void {
    this.user.getPendingProfessor().subscribe(x => {
      this.responseData = x
      this.responseData = this.responseData.data
      if (this.responseData.length !== 0) {
        this.responseData.forEach((element: any) => {
          this.user.getUserData(element._id).subscribe(x => {
            const temp: any = x;
            this.dataForApproval.push(this.formatDataToDisplay(temp.data, element))
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
    }
    return value;
  }

  approve(id: string) {
    var value: any = {
      id: id
    }
    this.dialog.setDetails("Approve", "Deny", "Select button to update user status?")
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x === true) {
        value['verified'] = 'approved'
      } else if (x === false) {
        value['verified'] = 'denied'
      } else {
        value['verified'] = 'pending'
      }
      this.user.userPermission(value).subscribe(x => {
        this.responseData = x;
        this.toastr.success(this.responseData.data, "Success")
        location.reload()
      })
    })
  }
}
