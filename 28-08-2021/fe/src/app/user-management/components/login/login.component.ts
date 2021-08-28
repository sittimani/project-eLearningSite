import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
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
  formName = 'Login Form'
  errorMessage = 'please fill the form correctly'
  responseData: any
  adminLogin: boolean = false;

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private dialog: DialogService) {
    const href = this.router.url;
    if (href.includes('admin')) {
      this.adminLogin = true;
    }
    if (href.includes('topic')) {
      this.isStudentLogin = false
    }
    this.auth.loggedIn()
    if (this.auth.getToken()) {
      this.auth.verifyToken().subscribe(x => {
        this.router.navigate(['home'])
      })
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  loginAsStudent() {
    var value = this.loginForm.value;
    value.role = 'student'
    this.auth.loginAsStudent(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.isInvalidForm = false;
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.dialog.setDetails("Ok", "cancel", this.responseData.message);
        this.dialog.openDialog().afterClosed().subscribe(x => {
          this.auth.loggedIn()
          this.router.navigate(['home'])
        })
      } else {
        this.errorMessage = this.responseData.message;
        this.isInvalidForm = true;
      }
    })
  }

  loginAsProfessor() {
    var value = this.loginForm.value;
    value.role = 'professor'
    this.auth.loginAsProfessor(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.isInvalidForm = false;
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.dialog.setDetails("Ok", "cancel", this.responseData.message);
        this.dialog.openDialog().afterClosed().subscribe(x => {
          this.auth.loggedIn()
          this.router.navigate(['home'])
        })
      } else {
        this.errorMessage = this.responseData.message;
        this.isInvalidForm = true;
      }
    })
  }

  loginAsAdmin() {
    var value = this.loginForm.value;
    value.role = 'admin'
    this.auth.loginAsAdmin(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.isInvalidForm = false;
        console.log(this.responseData)
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.auth.loggedIn()
        this.router.navigate(['admin/dashboard'])
      } else {
        this.errorMessage = this.responseData.message;
        this.isInvalidForm = true;
      }
    })
  }

  triggerProfessorLogin() {
    this.router.navigate(['topic/login'])
  }

  triggerisStudentLogin() {
    this.router.navigate(['login'])
  }
}
