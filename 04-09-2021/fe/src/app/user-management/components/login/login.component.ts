import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { QaService } from 'src/app/question-and-answer/shared/service/qa.service';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isStudentLogin: boolean = true
  hide: boolean = true
  isInvalidForm: boolean = false
  title = 'Login Form'
  errorMessage = ''
  loginForm!: FormGroup
  responseData: any
  isForgotPassword: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    this.auth.loggedIn()
    if (this.auth.getToken()) {
      this.auth.verifyToken().subscribe(x => {
        this.router.navigate(['home'])
      }, error => {
        this.toastr.error("Internal Server Problem", "Error")
      })
    }
  }

  ngOnInit(): void {
    if (this.router.url.includes('forgotpassword')) {
      this.isForgotPassword = true;
      this.title = 'Reset Password'
      this.loginForm.get('password')?.disable()
    }
  }

  logIn() {
    if (this.loginForm.valid) {
      var value = this.loginForm.value;
      this.auth.loginAsUser(value).subscribe(x => {
        this.setToken(x)
      }, error => {
        this.serverIssue()
      })
    } else {
      this.errorMessage = "Please Fill the Form Correctly"
      this.isInvalidForm = true;
    }
  }

  setToken(x: any) {
    this.responseData = x;
    if (this.responseData.success === true) {
      this.isInvalidForm = false;
      this.auth.saveToken(this.responseData)
    } else {
      this.errorMessage = this.responseData.message;
      this.isInvalidForm = true;
    }
  }

  serverIssue() {
    this.toastr.error("Internal Server Problem", "Error")
    this.router.navigate(['login'])
  }

  resetPassword() {
    if (this.loginForm.valid) {
      this.auth.forgotPassword({ email: this.loginForm.get('email')?.value }).subscribe(x => {
        this.responseData = x;
        if (this.responseData.success === true) {
          this.toastr.success(this.responseData.message, "Success")
          this.router.navigate(['login'])
        } else {
          this.toastr.error(this.responseData.message, "Error")
        }
      }, error => {
        this.serverIssue()
      })
    }
  }

  triggerForgotPassword() {
    this.router.navigate(['forgotpassword'])
  }

  getField(name: any) {
    return this.loginForm.get(name) as FormControl
  }
}