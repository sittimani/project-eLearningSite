import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Topic } from "src/app/topic-management";
import { AuthService, Roles, UserDetails } from "src/app/user-management";
import { environment } from "src/environments/environment";
import { CourseList, CourseService } from "../..";
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
    this.getAllCourse();
  }

  private getAllCourse() {
    this.courseService.getAllCourse().subscribe((response: Topic[]) => {
      this.formatCourse(response);
    })
  }

  public formatCourse(responseData: Topic[]): void {
    this.allCourse = [];
    this.isNoCourse = true;
    if (this.isNotUndefined(responseData)) {
      this.allCourse = responseData.map(this.formatDocument)
      this.isNoCourse = false;
    }
  }

  private isNotUndefined(responseData: Topic[]): boolean {
    if (responseData !== undefined)
      if (responseData.length)
        return true;
    return false
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
          this.getAllCourse();
        })
      }
    })
  }

  public exploreCourse(name: string): void {
    this.router.navigate(["topic/" + name]);
  }
}
