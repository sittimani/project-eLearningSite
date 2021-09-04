import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './core/shared/service/loader.service';
import { QaService } from './question-and-answer/shared/service/qa.service';
import { AuthService } from './user-management/shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fe';
  open = false;
  isLoggedIn = false;
  userName!: string;
  userId!: string;
  roles:any = {
    createCourse: false
  } 
  responseData: any
  isLoading!:boolean


  constructor(
    private auth: AuthService, 
    private router: Router, 
    public loader:LoaderService,
    private qaService: QaService,
    private toastr: ToastrService) {

    this.auth.behSubject$.subscribe(x => {
      if (x === true) {
        this.auth.verifyToken().subscribe(x => {
          this.responseData = x;
          this.isLoggedIn = true;
          this.userName = this.responseData.users.name;
          this.userId = this.responseData.users._id;
          this.roles = this.responseData.users.role;
          console.log(this.roles)
        }, error => {
          if (error instanceof HttpErrorResponse) {
            this.router.navigate(['login'])
            this.roles.createCourse = false
          }
        })
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit(){
    this.loader.isLoading.subscribe(x => {
      this.isLoading = x;
    })
  }
  updateProfile(){
    this.router.navigate(['updateProfile/' + this.userId])
  }

  takeQuestion(){
    this.qaService.openInputDialog().afterClosed().subscribe(x => {
      if(x === true){
        const value = {
          studentID: this.userId,
          studentName: this.userName,
          question: this.qaService.question,
          isAnswered: false
        }
        this.qaService.uploadQuestion(value).subscribe( x => {
          this.responseData = x;
          if(this.responseData.success === true){
            this.toastr.success(this.responseData.message, "Success")
            location.reload()
          } else {
            this.toastr.success(this.responseData.message, "Error")
          }
        }, error => {
          this.toastr.success(this.responseData.message, "Error")
        })
      }
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.roles.createCourse = false
    this.auth.loggedIn()
    this.router.navigate(['login'])
  }

}
