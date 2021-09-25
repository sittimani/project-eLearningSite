import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CourseOverView } from "src/app/course-management";
import { DialogService } from "src/app/shared";
import { Roles, AuthService } from "src/app/user-management";
import { Topic, TopicDetail, TopicService } from "../..";


@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.css"]
})
export class TopicComponent implements OnInit {

  public roles: Roles = {
    readDocument: false,
    createDocument: false,
    updateDocument: false
  };
  public keysDisplayed: string[] = [];
  private keys!: string[];
  public courseName = "";
  public topicsDisplayed: TopicDetail[] = [];
  public isNoCourse = false;
  public overView: CourseOverView = {
    description: "",
    shortDescription: ""
  };

  constructor(
    private auth: AuthService,
    private topic: TopicService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private dialog: DialogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseName = this.currentRoute.snapshot.params["name"];
    this.getCourse();
    const userDetails = this.auth.getUserDetails();
    if (userDetails)
      this.roles = userDetails.role;
  }

  private getCourse() {
    this.isNoCourse = false;
    this.topic.getCourse(this.courseName).subscribe((response: Topic) => {
      if (response !== undefined && response[0] !== undefined && response.length) {
        this.reStructureData(response[0]);
        this.isNoCourse = true;
      }
    })
  }

  public reStructureData(object: Topic): void {
    this.topicsDisplayed = [];
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      if (key === "overview") {
        this.overView = object[key];
      } else if (!this.skipKey(key)) {
        this.keysDisplayed.push(key);
        this.topicsDisplayed.push(object[key]);
      }
    })
  }

  public skipKey(key: string) {
    return (key === "_id" || key === "courseName");
  }

  public updateTopic(index: number): void {
    const topicName = this.keysDisplayed[index];
    this.topic.triggerUpdateTopicForm(topicName);
    this.router.navigate(["topic/update/" + this.courseName]);
  }

  public deleteTopic(index: number): void {
    const topicName = this.keysDisplayed[index];
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + topicName + " topic?");
    this.dialog.openDialog().afterClosed().subscribe((choice: boolean) => {
      if (choice) {
        this.topic.deleteTopic(this.courseName, topicName).subscribe((response: string) => {
          this.toastr.success(response, "Success");
          this.getCourse();
        });
      }
    });
  }

  public triggerAddTopic(): void {
    this.router.navigate(["topic/add/" + this.courseName]);
  }
}
