import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { CourseService } from '../../shared/service/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})

export class CourseFormComponent implements OnInit {

  invalidForm: boolean = false;
  formName = "Add New Course"
  courseForm: FormGroup
  url: any
  responseData: any
  roles: any
  fileUploaded: boolean = false
  file = new FormData()

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private course: CourseService) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      overview: ['', [Validators.required, Validators.minLength(30)]],
      description: ['', [Validators.required, Validators.minLength(100)]]
    })
    this.url = this.router.url;
    this.auth.loggedIn();
    this.checkPrivillages()
  }

  ngOnInit(): void {
  }

  checkPrivillages() {
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.roles = this.responseData.users.role;
      if (!this.roles.createCourse) {
        this.router.navigate(['home'])
      }
    }, error => {
      console.log(error)
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  onFileSelected(event: any) {
    this.fileUploaded = true;
    const coursePic = event.target.files[0]
    this.file.set('avator', coursePic)
  }

  addnewCourse() {
    if (this.fileUploaded) {
      this.invalidForm = false;
      var value = this.courseForm.value;
      this.course.getPicName(this.file).subscribe(x => {
        value.url = x
        this.course.uploadCourse(value).subscribe(data => {
          this.responseData = data;
          if (this.responseData.success === true) {
            this.router.navigate(['home'])
          }else{
            this.invalidForm = true;
          }
        })
      }, error => {
        this.invalidForm = true;
      })
    } else {
      this.invalidForm = true;
    }
  }

  public get courseName() {
    return this.courseForm.get('courseName') as FormControl
  }

  public get overview() {
    return this.courseForm.get('overview') as FormControl
  }

  public get description() {
    return this.courseForm.get('description') as FormControl
  }

}
