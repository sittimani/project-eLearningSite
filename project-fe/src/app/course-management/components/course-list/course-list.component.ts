import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  CourseList,
  DialogService,
  Roles,
  Topic,
  userDetails
} from "src/app/core";
import { AuthService } from "src/app/user-management";
import { environment } from "src/environments/environment";
import { CourseService } from "../..";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {

  public roles: Roles = {
    readDocument: false,
    createDocument: false,
    updateDocument: false
  };
  public allCourse: CourseList[] = [];
  public isNoCourse = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private courseService: CourseService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const userDetails: userDetails = this.auth.getUserDetails();
    if (userDetails) {
      this.roles = userDetails.role;
    }
    this.getCourses();
  }

  public getCourses(): void {
    this.allCourse = [];
    this.courseService.getAllCourse().subscribe((response: Topic[]) => {
      let responseData = response;
      const count: number = responseData.length
      this.isNoCourse = true;
      if (count !== 0) {
        this.allCourse = responseData.map(this.formatDocument)
        this.isNoCourse = false;
      }
    })
  }

  private formatDocument(document: Topic): CourseList {
    return {
      id: document._id,
      name: document.courseName,
      shortDescription: document["overview"]["shortDescription"],
      url: environment.serverAddress + "uploads/" + document["overview"]["url"]
    }
  }

  public deleteCourse(name: string): void {
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + name + " course?");
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x) {
        this.courseService.deleteCourse(name).subscribe((responseData: string) => {
          this.toastr.success(responseData, "Success");
          this.getCourses();
        })
      }
    })
  }

  public exploreCourse(name: string): void {
    this.router.navigate(["topic/" + name]);
  }
}
