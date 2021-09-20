import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  CourseOverView,
  DialogService,
  Roles,
  Topic,
  TopicDetail
} from "src/app/core";
import { AuthService } from "src/app/user-management";
import { TopicService } from "../..";


@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.css"]
})
export class TopicComponent implements OnInit {

  public roles!: Roles;
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
  ) {
    this.courseName = this.currentRoute.snapshot.params["name"];
  }

  ngOnInit(): void {
    this.getCourse();
    const userDetails = this.auth.getUserDetails();
    if (userDetails) {
      this.roles = userDetails.role;
    }
  }

  private getCourse(): void {
    this.topicsDisplayed = []
    this.topic.getCourse(this.courseName).subscribe((response: Topic[]) => {
      const data = response;
      data[0] ? this.reStructureData(data[0]) : this.isNoCourse = true;
    })
  }

  private reStructureData(object: Topic): void {
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      if (key === "overview") {
        this.overView = object[key]
      } else if (!(key === "_id" || key === "courseName" || key === "updatedAt" || key === "createdAt")) {
        this.keysDisplayed.push(key)
        this.topicsDisplayed.push(object[key])
      }
    })
  }

  public updateTopic(index: number): void {
    const topicName = this.keysDisplayed[index];
    this.topic.triggerUpdateTopicForm(topicName);
    this.router.navigate(["topic/update/" + this.courseName]);
  }

  public deleteTopic(index: number): void {
    const topicName = this.keysDisplayed[index];
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + topicName + " topic?");
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x) {
        this.topic.deleteTopic(this.courseName, topicName).subscribe((response: string) => {
          this.toastr.success(response, "Success");
          this.getCourse();
        })
      }
    })
  }

  public triggerAddTopic(): void {
    this.router.navigate(["topic/add/" + this.courseName])
  }
}
