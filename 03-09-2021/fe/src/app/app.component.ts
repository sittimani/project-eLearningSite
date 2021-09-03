import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './core/shared/service/loader.service';
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
    public loader:LoaderService) {
    this.auth.behSubject$.subscribe(x => {
      if (x === true) {
        this.auth.verifyToken().subscribe(x => {
          this.responseData = x;
          this.isLoggedIn = true;
          this.userName = this.responseData.users.name;
          this.userId = this.responseData.users._id;
          this.roles = this.responseData.users.role;
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

  logout() {
    localStorage.removeItem('token')
    this.roles.createCourse = false
    this.auth.loggedIn()
    this.router.navigate(['login'])
  }

}
