import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { environment } from 'src/environments/environment';
import { CourseService } from '../..';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public roles: any = {
    readDocument: false,
    createDocument: false,
    deleteCourse: false,
  };
  public responseData: any = [];
  public allCourse: any = []
  public isNoCourse: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private courseService: CourseService,
    private dialog: DialogService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.auth.loggedIn();
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.roles = this.responseData.users.role;
      this.getCourses();
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  getCourses() {
    this.courseService.getAllCourse().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;

      if (this.responseData.length != 0) {
        this.responseData.forEach((document: any) => {
          var details = {
            id: document.id,
            name: document.courseName,
            shortDescription: document['overview']['shortDescription'],
            url: environment.serverAddress + 'uploads/' + document['overview']['url']
          }
          this.allCourse.push(details)
          this.isNoCourse = false;
        });
      } else {
        this.isNoCourse = true;
      }
    })
  }

  deleteCourse(name: string) {
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + name + " course?");
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x === true) {
        this.courseService.deleteCourse(name).subscribe(x => {
          this.responseData = x;
          if (this.responseData.success === true) {
            this.toastr.success(this.responseData.message, "Success")
            this.router.navigate(['login'])
          } else {
            this.toastr.error(this.responseData.message, "Error")
          }
        })
      }
    })
  }

  exploreCourse(name: string) {
    this.router.navigate(['topic/' + name])
  }
}
