import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseList, DialogService, Roles } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { environment } from 'src/environments/environment';
import { CourseService } from '../..';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  public roles!: Roles;
  public responseData: any;
  public allCourse: CourseList[] = [];
  public isNoCourse!: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private courseService: CourseService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {
    this.responseData = this.auth.getUserDetails();
    if (this.responseData) {
      this.roles = this.responseData.role;
      this.getCourses();
    }
  }

  getCourses() {
    this.allCourse = [];
    this.courseService.getAllCourse().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      if (this.responseData.length != 0) {
        this.responseData.forEach((document: any) => {
          var details = {
            id: document._id,
            name: document.courseName,
            shortDescription: document['overview']['shortDescription'],
            url: environment.serverAddress + 'uploads/' + document['overview']['url']
          };
          this.allCourse.push(details);
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
          this.toastr.success(this.responseData.data, "Success");
          this.getCourses();
        })
      }
    })
  }

  exploreCourse(name: string) {
    this.router.navigate(['topic/' + name]);
  }
}
