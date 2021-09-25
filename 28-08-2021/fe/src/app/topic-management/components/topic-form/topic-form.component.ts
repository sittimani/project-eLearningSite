import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from '../../shared/service/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  isTopicAddForm: boolean = true;
  invalidForm: boolean = false;
  formName: string = 'Topic Adding Form'
  disable: boolean = false;
  roles: any;
  responseData: any
  url: string;
  courseName: string = ''
  teacherID!: string

  courseForm: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private topic: TopicService, private activatedRoute: ActivatedRoute) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required]],
      topicName: ['', [Validators.required]],
      documentLink: ['', [Validators.required]],
      toturialLink: ['', [Validators.required]]
    })
    this.url = this.router.url;
    this.auth.loggedIn()
    this.checkPrivillages()
    this.courseName = activatedRoute.snapshot.params['name']
    this.courseForm.patchValue({ courseName: this.courseName });
    this.courseForm.controls['courseName'].disable()
  }

  ngOnInit(): void {
  }

  checkPrivillages() {
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.teacherID = this.responseData.users._id;
      this.roles = this.responseData.users.role;
      // check user had add permission
      if (this.url.includes('add')) {
        if (!this.roles.createDocument) {
          this.router.navigate(['home'])
        }
      } else if (this.url.includes('update')) {
        // check user had update permission
        if (!this.roles.updateDocument) {
          this.router.navigate(['home'])
        } else {
          this.formName = 'Topic Update Form'
          this.isTopicAddForm = false;
          this.loadForm()
        }
      }
    }, error => {
      console.log(error)
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['topic/login'])
      }
    })
  }
  addTopic() {
    var value = this.courseForm.value;
    value.teacherID = this.teacherID
    value.courseName = this.courseName
    this.topic.addNewCourse(value).subscribe(x => {
      this.responseData = x;
      if(this.responseData.success === true){
        this.router.navigate(['home'])
      }else{
        console.log('error in updating course')
      }
    })
  }

  loadForm() {
    this.topic.behaviorSubject$.subscribe(x => {
      if (x === 'no') {
        this.router.navigate(['home'])
      }
      this.courseForm.patchValue(x);
      this.courseForm.controls['topicName'].disable()
    })
  }
  updateTopic() {
    var value = this.courseForm.value;
    value.teacherID = this.teacherID
    value.courseName = this.courseName
    value.topicName = this.courseForm.get('topicName')?.value;
    this.topic.addNewCourse(value).subscribe(x => {
      this.responseData = x;
      if(this.responseData.success === true){
        this.router.navigate(['home'])
      }else{
        console.log('error in updating course')
      }
    })
    console.log(this.courseForm.value)
  }

}
