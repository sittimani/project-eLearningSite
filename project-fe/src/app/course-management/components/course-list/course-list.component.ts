import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Topic } from "src/app/topic-management";
import { AuthService, Roles } from "src/app/user-management";
import { environment } from "src/environments/environment";
import { CourseList, CourseService } from "../..";
import { UserDetails } from "src/app/user-management";
import { DialogService } from "src/app/shared";

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
    const UserDetails: UserDetails = this.auth.getUserDetails();
    if (UserDetails)
      this.roles = UserDetails.role;
    this.getCourses();
  }

  public getCourses(): void {
    this.allCourse = [];
    this.courseService.getAllCourse().subscribe((response: Topic[]) => {
      let responseData = response;
      const count: number = responseData.length;
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
    this.dialog.openDialog().afterClosed().subscribe((choice: boolean) => {
      if (choice) {
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
