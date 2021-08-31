import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/core/shared/class/login';
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
  title = 'Login Form'
  errorMessage = ''
  loginForm!: FormGroup
  responseData: any

  //loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private dialog: DialogService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.auth.loggedIn()
    if (this.auth.getToken()) {
      this.auth.verifyToken().subscribe(x => {
        this.router.navigate(['home'])
      })
    }
  }

  ngOnInit(): void {
  }

  logIn() {
    if (this.loginForm.valid) {
      var value = this.loginForm.value;
      this.auth.loginAsStudent(value).subscribe(x => {
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
    this.dialog.setDetails('OK', "Cancel", "Internal Server Problem")
    this.dialog.openDialog().afterClosed().subscribe(x => {
      this.router.navigate(['login'])
    })
  }

  triggerProfessorLogin() {
    this.router.navigate(['topic/login'])
  }

  triggerisStudentLogin() {
    this.router.navigate(['login'])
  }


  getField(name: any){
    return this.loginForm.get(name) as FormControl
  }
}