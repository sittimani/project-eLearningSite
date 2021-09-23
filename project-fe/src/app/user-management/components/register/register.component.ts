import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors, passwordMatchValidator, ErrorMessage } from "src/app/core";
import { AuthService, UserInformation, UserProfileService } from "../..";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

  public title = "Registration Form";
  public isAddUser = true;
  public isHide = true;
  public isUpdateForm = false;
  public isProfessorUpdate = false;
  public registrationForm!: FormGroup;
  private id!: string;
  public userErrors = UserErrors;
  public errorMessage: ErrorMessage;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userProfile: UserProfileService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.pattern("[A-Za-z]*")]],
      age: [, [Validators.required, Validators.min(15), Validators.max(60)]],
      gender: ["", [Validators.required]],
      phone: [, [Validators.pattern("[0-9]{10,10}")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      workingAt: ["", [Validators.required]]
    }, { validator: passwordMatchValidator("password", "confirmPassword") });
    this.errorMessage = new ErrorMessage();
  }

  ngOnInit(): void {
    this.loadForm()
    const url = this.router.url;
    if (url.includes("update-profile")) {
      this.loadDataForUpdate();
    } else if (this.auth.getToken()) {
      this.router.navigate(["home"]);
    }
  }

  public addUser(): void {
    if (this.registrationForm.valid) {
      let value = this.registrationForm.value;
      const href = this.router.url;
      href.includes("topic") ? value.role = "professor" : value.role = "student";
      this.registerUser(value);
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  private registerUser(value: UserInformation): void {
    this.auth.registerAsUser(value).subscribe((response: string) => {
      this.toastr.success(response, "Success");
      this.router.navigate(["login"]);
    })
  }

  public updateUser(): void {
    if (this.registrationForm.valid) {
      let valueToUpdate = this.registrationForm.value;
      this.userProfile.updateUser(this.id, valueToUpdate).subscribe((response: string) => {
        this.toastr.success(response, "Success");
        this.router.navigate(["home"]);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  private loadForm(): void {
    const href = this.router.url;
    // To load topic/register
    href.includes("topic") ? this.isAddUser = false : this.getField("workingAt")?.disable();
  }

  private loadDataForUpdate(): void {
    this.title = "Update User";
    this.disableFieldForUpdate();
    this.isUpdateForm = true;
    this.id = this.currentRoute.snapshot.params["id"];
    const responseData = this.auth.getUserDetails();
    this.getField("workingAt")?.disable();
    if (responseData.role.updateDocument) {
      this.isProfessorUpdate = true;
      this.getField("workingAt")?.enable();
    }
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userProfile.getUserData(this.id).subscribe((response: UserInformation) => {
      if (!response) {
        this.toastr.error("Invalid User", "Error");
        this.router.navigate(["home"]);
      } else {
        this.registrationForm.patchValue(response);
      }
    })
  }

  private disableFieldForUpdate(): void {
    this.getField("password")?.disable();
    this.getField("confirmPassword")?.disable();
    this.getField("email")?.disable();
  }

  public getField(name: string): FormControl {
    return this.registrationForm.get(name) as FormControl;
  }

  public cancel(): void {
    this.router.navigate(["home"]);
  }

  public triggerStudentRegister(): void {
    this.router.navigate(["register"]);
  }

  public triggerProfessorRegister(): void {
    this.router.navigate(["topic/register"]);
  }
}
