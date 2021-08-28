import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../core/shared/service/dialog.service';
import { AuthService } from '../../../user-management/shared/service/auth.service';
import { UserProfileService } from '../../../user-management/shared/service/user-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  responseData: any
  role: any = {
    createCourse: false
  }
  dataForApproval: any = []

  status: any = [];
  constructor(private auth: AuthService,private dialog:DialogService, private router: Router, private user: UserProfileService) {
    this.auth.loggedIn()
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.role = this.responseData.users.role;
      if (!this.role.createCourse) {
        console.log(this.role)
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
        this.responseData.forEach((element: any) => {
          this.user.getProfessorData(element._id).subscribe( x => {
            const temp:any = x;
            const value = {
              name: temp.name,
              email: element.email,
              _id: element._id,
              workingAt: temp.workingAt
            }
            this.dataForApproval.push(value)
          })
        })
      }else{
        this.router.navigate(['admin/dashboard'])
      }
    }, error => {
      this.router.navigate(['home'])
    })

  }

  Approve(id: string) {
    var value:any = {
      id:id
    }
    this.dialog.setDetails("Approve", "Deny", "Select button to update user status?")
    this.dialog.openDialog().afterClosed().subscribe( x => {
      if(x === true){
        value['verified'] = 'approved'
        this.user.userPermission(value).subscribe(x => {
          this.responseData = x;
          if(this.responseData.success === true){
            console.log("successfully accepted")
            this.router.navigate(['admin/dashboard'])
          }
        }, error => {
          this.router.navigate(['admin/dashboard'])
        })
      }else if(x === false) {
        value['verified'] = 'denied'
        this.user.userPermission(value).subscribe(x => {
          this.responseData = x;
          if(this.responseData.success === true){
            console.log("successfully denied")
            this.router.navigate(['admin/dashboard'])
          }
        }, error => {
          this.router.navigate(['admin/dashboard'])
        })
      }
    })
  }

  deny(id: string) {
    console.log(id)
  }

}
