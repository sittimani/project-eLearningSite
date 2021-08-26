import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public roles;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.verifyToken().subscribe(x => {
      console.log(x)
    }, error => {
      if(error instanceof HttpErrorResponse){
        console.log(error)
      }
    })
    // if (this.auth.loggedIn() === false) {
    //   this.router.navigate(['/login'])
    // }else{
    //   console.log(this.auth.roles)
    // }
    this.roles = this.auth.roles
  }

  ngOnInit(): void {
  }

  triggerAddCourse() {
    this.router.navigate(['professor/addtopic'])
  }

  exploreCourse() {
    this.router.navigate(['course'])
  }

}
