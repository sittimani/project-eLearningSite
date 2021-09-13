import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { TopicService } from '../..';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  public isTopicAddForm: boolean = true;
  public title: string = 'Topic Adding Form'
  public roles: any;
  private responseData: any
  public url!: string;
  private courseName: string = ''
  private teacherID!: string

  courseForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private topic: TopicService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {

    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      topicName: ['', [Validators.required, Validators.minLength(5)]],
      documentLink: ['', [Validators.required, Validators.minLength(5)]],
      toturialLink: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.courseName = this.activatedRoute.snapshot.params['name']
    this.auth.loggedIn()
    this.checkPrivillages()
    this.courseForm.patchValue({ courseName: this.courseName });
    this.courseForm.controls['courseName'].disable()
  }

  checkPrivillages() {
    this.responseData = this.auth.getUserDetails()
    this.teacherID = this.responseData._id
    this.roles = this.responseData.role
    this.loadPage()
  }

  loadPage() {
    if (this.url.includes('add')) {
      if (!this.roles.createDocument) {
        this.router.navigate(['home'])
      }
    } else if (this.url.includes('update')) {
      // check user had update permission
      if (!this.roles.updateDocument) {
        this.router.navigate(['home'])
      } else {
        this.title = 'Topic Update Form'
        this.isTopicAddForm = false;
        this.loadForm()
      }
    }
  }

  addTopic() {
    if (this.courseForm.valid) {
      var value = this.courseForm.value;
      value.teacherID = this.teacherID
      value.courseName = this.courseName
      this.topic.updateCourse(value).subscribe(x => {
        this.responseData = x
        this.toastr.success(this.responseData.data, "Success")
        this.router.navigate(['topic/' + this.courseName])
      })
    } else {
      this.toastr.error(Constants.invalidForm, "Error")
    }
  }

  loadForm() {
    var topicName = '';
    this.topic.behaviorSubject$.subscribe(x => {
      topicName = x;
    })
    if (topicName === 'no') {
      this.router.navigate(['home'])
    }
    this.topic.getTopics(this.courseName).subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data
      this.courseForm.get('topicName')?.setValue(topicName)
      this.courseForm.patchValue(this.responseData[topicName])
      this.courseForm.get('topicName')?.disable()
    })
  }

  updateTopic() {
    if (this.courseForm.valid) {
      var value = this.courseForm.value;
      value.teacherID = this.teacherID
      value.courseName = this.courseName
      value.topicName = this.courseForm.get('topicName')?.value;
      this.topic.updateCourse(value).subscribe(x => {
        this.responseData = x;
        this.toastr.success(this.responseData.data, "Success")
        this.router.navigate(['topic/' + this.courseName])
      })
    } else {
      this.toastr.error(Constants.invalidForm, "Error")
    }
  }

  cancel() {
    this.router.navigate(['home'])
  }

  public getField(name: any) {
    return this.courseForm.get(name) as FormControl
  }

}
