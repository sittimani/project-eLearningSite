import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { ErrorMessage, UserErrors } from "src/app/core";
import { AuthService, UserDetails } from "src/app/user-management";
import { Topic, TopicDetail, TopicService } from "../..";

@Component({
  selector: "app-topic-form",
  templateUrl: "./topic-form.component.html",
  styleUrls: ["./topic-form.component.css"]
})

export class TopicFormComponent implements OnInit {

  public isTopicAddForm = true;
  public title = "Topic Adding Form";
  public url!: string;
  private courseName!: string;
  private teacherID!: string;
  public topicForm: FormGroup;
  public errorMessage: ErrorMessage;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private topic: TopicService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.topicForm = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.minLength(3)]],
      topicName: ["", [Validators.required, Validators.minLength(5)]],
      documentLink: ["", [Validators.required, Validators.minLength(10)]],
      tutorialLink: ["", [Validators.required, Validators.minLength(10)]]
    });
    this.errorMessage = new ErrorMessage();
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.courseName = this.activatedRoute.snapshot.params["name"];
    this.topicForm.patchValue({ courseName: this.courseName });
    this.topicForm.controls["courseName"].disable();
    this.checkPage();
  }

  private checkPage(): void {
    const details: UserDetails = this.auth.getUserDetails();
    if (details) {
      this.teacherID = details._id;
      this.loadPage();
    }
  }

  private loadPage(): void {
    if (this.url.includes("update")) {
      this.title = "Topic Update Form";
      this.isTopicAddForm = false;
      this.loadForm();
    }
  }

  public addTopic(): void {
    if (this.topicForm.valid) {
      let value = this.topicForm.value;
      value.teacherID = this.teacherID;
      value.courseName = this.courseName;
      this.topic.updateCourse(value).subscribe((response: string) => {
        this.toastr.success(response, "Success");
        this.router.navigate(["topic/" + this.courseName]);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  private loadForm(): void {
    let topicName = "";
    this.topic.shareTopic$.subscribe((name: string) => {
      topicName = name;
    })
    if (topicName === "no")
      this.router.navigate(["home"]);
    this.topic.getCourse(this.courseName).subscribe((response: Topic) => {
      const topicData: TopicDetail = response[0][topicName];
      this.topicForm.get("topicName")?.setValue(topicName);
      this.topicForm.patchValue(topicData);
      this.topicForm.get("topicName")?.disable();
    })
  }

  public updateTopic(): void {
    if (this.topicForm.valid) {
      let value = this.topicForm.value;
      value.teacherID = this.teacherID;
      value.courseName = this.courseName;
      value.topicName = this.topicForm.get("topicName")?.value;
      this.topic.updateCourse(value).subscribe((response: string) => {
        this.toastr.success(response, "Success");
        this.router.navigate(["topic/" + this.courseName]);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  public cancel(): void {
    this.router.navigate(["topic/" + this.courseName]);
  }

  public getField(name: string): FormControl {
    return this.topicForm.get(name) as FormControl;
  }
}
