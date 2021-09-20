import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors, passwordMatchValidator, ResetPassword } from "src/app/core";
import { AuthService } from "../..";


@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.css"]
})
export class PasswordComponent implements OnInit {

  public passwordForm: FormGroup;
  public isInvalidForm = false;
  public isHide = true;
  public title = "Password Reset Form";
  private id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(8)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
    }, { validator: passwordMatchValidator("password", "confirmPassword") });
  }

  ngOnInit() {
    const userDetails = this.auth.getUserDetails();
    if (userDetails) {
      this.id = userDetails._id;
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      let value: ResetPassword = {
        id: this.id,
        oldPassword: this.passwordForm.get("oldPassword")?.value,
        newPassword: this.passwordForm.get("password")?.value
      };
      this.auth.updatePassword(value).subscribe((response: string) => {
        this.toastr.success(response, "Success");
        this.router.navigate(["home"]);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  public getField(name: string): FormControl {
    return this.passwordForm.get(name) as FormControl;
  }
}
