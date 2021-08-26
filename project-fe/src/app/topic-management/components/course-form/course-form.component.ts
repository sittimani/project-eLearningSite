import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})

export class CourseFormComponent implements OnInit {

  invalidForm: boolean = false;
  formName = "Add New Course"
  courseForm: FormGroup


  constructor(private formBuilder: FormBuilder) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required, Validators.minLength(3)],
      overview: ['', Validators.required, Validators.minLength(30)],
      description: ['', Validators.required, Validators.minLength(100)]
    })
  }

  ngOnInit(): void {
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

  onFileSelected(event: any) {

  }

  addnewCourse() {

  }

}
