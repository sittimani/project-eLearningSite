import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from '../../shared/service/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  isTopicAddForm: boolean = true;
  isInvalidForm: boolean = false;
  title: string = 'Topic Adding Form'
  disable: boolean = false;
  roles: any;
  responseData: any
  url!: string;
  courseName: string = ''
  teacherID!: string
  errorMessage!: string

  courseForm: FormGroup

  constructor(private formBuilder: FormBuilder, private dialog:DialogService, private auth: AuthService, private router: Router, private topic: TopicService, private activatedRoute: ActivatedRoute) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      topicName: ['', [Validators.required, Validators.minLength(5)]],
      documentLink: ['', [Validators.required, Validators.minLength(5)]],
      toturialLink: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.auth.loggedIn()
    this.checkPrivillages()
    this.courseName = this.activatedRoute.snapshot.params['name']
    this.courseForm.patchValue({ courseName: this.courseName });
    this.courseForm.controls['courseName'].disable()
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
          this.title = 'Topic Update Form'
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
    console.log(this.courseForm.valid)
    if (this.courseForm.valid) {
      var value = this.courseForm.value;
      value.teacherID = this.teacherID
      value.courseName = this.courseName
      this.topic.updateCourse(value).subscribe(x => {
        this.responseData = x;
        if (this.responseData.success === true) {
          this.router.navigate(['home'])
        } else {
          this.showMessage(this.responseData.message)
        }
      })
    } else {
      this.errorMessage = "Please Fill the Form Correctly"
      this.isInvalidForm = true;
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
      if (this.responseData.success === true) {
        this.courseForm.get('topicName')?.setValue(topicName)
        this.courseForm.patchValue(this.responseData.data[topicName])
        this.courseForm.get('topicName')?.disable()
      }else {
        this.showMessage(this.responseData.message);
        this.router.navigate(['home'])
      }
    }, error => {
      this.showMessage("Internal server Error")
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
        if (this.responseData.success === true) {
          this.router.navigate(['home'])
        } else {
          this.showMessage(this.responseData.message)
        }
      })
    } else {
      this.errorMessage = "Please Fill the Form Correctly"
      this.isInvalidForm = true;
    }
    
  }

  showMessage(message: string){
    this.dialog.setDetails("Ok", "Cancel", message)
    this.dialog.openDialog()
  }

  cancel(){
    this.router.navigate(['home'])
  }

  public getField(name: any){
    return this.courseForm.get(name) as FormControl
  }
  
}
