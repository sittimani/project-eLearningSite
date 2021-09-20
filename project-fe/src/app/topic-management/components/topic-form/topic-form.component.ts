import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "src/app/core";
import { AuthService, UserDetails } from "src/app/user-management";
import { Topic, TopicDetail, TopicService } from "../..";

@Component({
  selector: "app-topic-form",
  templateUrl: "./topic-form.component.html",
  styleUrls: ["./topic-form.component.css"]
})
export class TopicFormComponent implements OnInit {

  public isTopicAddForm = true;
  public title = "Topic Adding Form"
  public url!: string;
  private courseName!: string
  private teacherID!: string
  public courseForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private topic: TopicService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.courseForm = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.minLength(3)]],
      topicName: ["", [Validators.required, Validators.minLength(5)]],
      documentLink: ["", [Validators.required, Validators.minLength(5)]],
      tutorialLink: ["", [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.courseName = this.activatedRoute.snapshot.params["name"];
    this.courseForm.patchValue({ courseName: this.courseName });
    this.courseForm.controls["courseName"].disable();
    this.checkPrivilages();
  }

  private checkPrivilages(): void {
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
    if (this.courseForm.valid) {
      let value = this.courseForm.value;
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
    this.topic.getTopics(this.courseName).subscribe((response: Topic) => {
      const topicData: TopicDetail = response[topicName]
      this.courseForm.get("topicName")?.setValue(topicName);
      this.courseForm.patchValue(topicData);
      this.courseForm.get("topicName")?.disable();
    })
  }

  public updateTopic(): void {
    if (this.courseForm.valid) {
      let value = this.courseForm.value;
      value.teacherID = this.teacherID;
      value.courseName = this.courseName;
      value.topicName = this.courseForm.get("topicName")?.value;
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
    return this.courseForm.get(name) as FormControl;
  }

}
