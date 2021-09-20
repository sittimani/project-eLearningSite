import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "src/app/core";
import { CourseService } from "../..";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.css"]
})

export class CourseFormComponent {

  public title = "Add New Course";
  public courseForm: FormGroup;
  public isFileUploaded = false;
  private file: FormData;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private course: CourseService,
    private toastr: ToastrService
  ) {
    this.courseForm = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.minLength(3)]],
      overview: ["", [Validators.required, Validators.minLength(30)]],
      description: ["", [Validators.required, Validators.minLength(100)]]
    });
    this.file = new FormData()
  }


  public onFileSelected(event: Event): void {
    this.isFileUploaded = false;
    const fileList = (event.currentTarget as HTMLInputElement).files;
    const coursePic: File = (fileList as FileList)[0]
    const name = coursePic.name;
    if (name.includes("png") || name.includes("jpeg") || name.includes("jpg")) {
      this.isFileUploaded = true;
      this.file.set("avator", coursePic);
    }
  }

  public addnewCourse(): void {
    if (this.isFileUploaded && this.courseForm.valid) {
      let value = this.courseForm.value;
      value.courseName = value.courseName.toLowerCase()
      this.course.getPicName(this.file).subscribe((response: string) => {
        value.url = response;
        this.course.uploadCourse(value).subscribe((response: string) => {
          this.toastr.success(response, "success");
          this.router.navigate(["home"]);
        })
      })
    } else {
      let error;
      !this.isFileUploaded ? error = UserErrors.InvalidFile : error = UserErrors.InvalidForm;
      this.toastr.error(error, "Error")
    }
  }

  public cancel(): void {
    this.router.navigate(["home"]);
  }

  public getField(name: string): FormControl {
    return this.courseForm.get(name) as FormControl;
  }
}
