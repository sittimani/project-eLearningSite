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
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.role = this.responseData.users.role;
      if (!this.role.createCourse) {
        this.router.navigate(['home'])
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  ngOnInit(): void {
    this.user.getPendingProfessor().subscribe(x => {
      this.responseData = x
      if (this.responseData.success === true) {
        this.responseData = this.responseData.data
        if (this.responseData.length !== 0) {
          this.responseData.forEach((element: any) => {
            this.user.getProfessorData(element._id).subscribe(x => {
              const temp: any = x;
              this.dataForApproval.push(this.formatDataToDisplay(temp, element))
            })
          })
        } else {
          this.isNoUser = true;
        }
      } else {
        this.router.navigate(['admin/dashboard'])
      }
    }, error => {
      this.router.navigate(['home'])
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
        if (this.responseData.success === true) {
          this.toastr.success(this.responseData.message, "Success")
          location.reload()
        } else {
          this.toastr.error(this.responseData.message, "Error")
        }
      }, error => {
        this.router.navigate(['admin/dashboard'])
      })
    })
  }
}
