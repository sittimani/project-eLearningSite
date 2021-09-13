import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { CourseService } from '../..';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  public title: string = "Add New Course"
  public courseForm: FormGroup
  private url: string
  private responseData: any
  public roles: any
  public isFileUploaded: boolean = false
  private file = new FormData()

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


  checkPrivillages() {
    this.responseData = this.auth.getUserDetails()
    this.roles = this.responseData.role
    if (!this.roles.createCourse) {
      this.router.navigate(['home'])
    }
  }

  onFileSelected(event: any) {
    const coursePic = event.target.files[0]
    if (coursePic.name.includes('png') || coursePic.name.includes('jpeg') || coursePic.name.includes('jpg')) {
      this.isFileUploaded = true;
      this.file.set('avator', coursePic)
    } else {
      this.isFileUploaded = false;
    }
  }

  addnewCourse() {
    if (this.isFileUploaded && this.courseForm.valid) {
      var value = this.courseForm.value;
      this.course.getPicName(this.file).subscribe(x => {
        value.url = x
        this.course.uploadCourse(value).subscribe(data => {
          this.responseData = data;
          this.toastr.success(this.responseData.data, "success")
          this.router.navigate(['home'])
        })
      })
    } else {
      if(!this.isFileUploaded){
        this.toastr.error(Constants.invalidFile, "Error")
      } else {
        this.toastr.error(Constants.invalidForm, "Error")
      }
    }
  }

  cancel() {
    this.router.navigate(['home'])
  }

  public getField(name: any) {
    return this.courseForm.get(name) as FormControl
  }

}
