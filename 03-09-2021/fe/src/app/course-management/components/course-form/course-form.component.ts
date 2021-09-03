import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { CourseService } from '../../shared/service/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  isInvalidForm: boolean = false;
  title = "Add New Course"
  courseForm: FormGroup
  url: any
  responseData: any
  roles: any
  fileUploaded: boolean = false
  errorMessage: string = ''
  file = new FormData()

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthService,
    private course: CourseService, 
    private toastr: ToastrService) {
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
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  onFileSelected(event: any) {
    const coursePic = event.target.files[0]
    console.log(coursePic)
    if(coursePic.name.includes('png') || coursePic.name.includes('jpeg') || coursePic.name.includes('jpg')){
      this.fileUploaded = true;
      this.file.set('avator', coursePic)
    }else{
      this.fileUploaded = false;
    }
  }

  addnewCourse() {
    if (this.fileUploaded && this.courseForm.valid) {
      this.isInvalidForm = false;
      var value = this.courseForm.value;
      this.course.getPicName(this.file).subscribe(x => {
        value.url = x
        this.course.uploadCourse(value).subscribe(data => {
          this.responseData = data;
          if (this.responseData.success === true) {
            this.router.navigate(['home'])
          } else {
            this.toastr.error(this.responseData.message, "Error")
          }
        })
      }, error => {
        this.toastr.error("Internal Server Problem", "Error")
        this.router.navigate(['home'])
      })
    } else {
      this.isInvalidForm = true;
      this.errorMessage = 'Please Fill the Form Correctly'
    }
  }

  cancel(){
    this.router.navigate(['home'])
  }

  public getField(name: any){
    return this.courseForm.get(name) as FormControl
  }

}
