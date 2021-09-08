import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/core';
import { AuthService } from '../..';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public isStudentLogin: boolean = true
  public isHide: boolean = true
  public isInvalidForm: boolean = false
  public title: string = 'Login Form'
  public errorMessage: string = ''
  public loginForm!: FormGroup
  private responseData: any
  public isForgotPassword: boolean = false

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
      this.router.navigate(['home'])
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
      this.errorMessage = Constants.invalidForm
      this.isInvalidForm = true;
    }
  }

  setToken(x: any) {
    this.responseData = x;
    if (this.responseData.statusCode === 200) {
      this.isInvalidForm = false;
      this.auth.saveToken(this.responseData)
    } else {
      this.errorMessage = this.responseData.message;
      this.isInvalidForm = true;
    }
  }

  serverIssue() {
    this.toastr.error(Constants.serverProblem, "Error")
    this.router.navigate(['login'])
  }

  resetPassword() {
    if (this.loginForm.valid) {
      this.auth.forgotPassword({ email: this.loginForm.get('email')?.value }).subscribe(x => {
        this.responseData = x;
        if (this.responseData.statusCode === 200) {
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