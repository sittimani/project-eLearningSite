import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "src/app/core";
import { AuthService, LoginCreditionals, LoginResponse } from "../..";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public isStudentLogin = true;
  public isHide = true;
  public title = "Login Form";
  public loginForm: FormGroup;
  public isForgotPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.auth.loggedIn();
      this.router.navigate(["home"]);
    }
    if (this.router.url.includes("forgotpassword")) {
      this.isForgotPassword = true;
      this.title = "Reset Password";
      this.loginForm.get("password")?.disable();
    }
  }

  public logIn(): void {
    if (this.loginForm.valid) {
      let value: LoginCreditionals = this.loginForm.value;
      this.auth.loginAsUser(value).subscribe((response: LoginResponse) => {
        console.log(response)
        this.setToken(response);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  private setToken(responseData: LoginResponse): void {
    this.auth.setToken(responseData);
    this.router.navigate(["home"]);
    this.toastr.success("Logged in successfully", "Success");
  }

  public resetPassword(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get("email")?.value;
      this.auth.forgotPassword({ email: email }).subscribe((response: string) => {
        this.toastr.success(response, "Success");
        this.router.navigate(["login"]);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  public triggerForgotPassword(): void {
    this.router.navigate(["forgotpassword"]);
  }

  public getField(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }
}