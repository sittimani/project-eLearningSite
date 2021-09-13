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
    
    this.auth.loggedIn();
    this.responseData = this.auth.getUserDetails()
    this.roles = this.responseData.role
    this.getCourses()
  }

  ngOnInit(): void {

  }

  getCourses() {
    this.courseService.getAllCourse().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data
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
      if (x) {
        this.courseService.deleteCourse(name).subscribe(x => {
          this.responseData = x;
          this.toastr.success(this.responseData.data, "Success")
        })
      }
    })
  }

  exploreCourse(name: string) {
    this.router.navigate(['topic/' + name])
  }
}
