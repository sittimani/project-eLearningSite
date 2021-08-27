import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isStudentLogin: boolean = true
  hide:boolean = true
  isInvalidForm:boolean = false
  formName = 'Login Form'
  errorMessage = 'please fill the form correctly'
  responseData:any

  loginForm:FormGroup
  
  constructor(private formBuilder: FormBuilder, private router:Router, private auth: AuthService) {
    const href = this.router.url;
    if(href.includes('topic')){
      this.isStudentLogin = false
    }
    this.auth.loggedIn()
    if(this.auth.getToken()){
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

  loginAsStudent(){
    var value = this.loginForm.value;
    value.role = 'student'
    this.auth.loginAsStudent(value).subscribe(x => {
      this.responseData = x;
      if(this.responseData.success === true){
        this.isInvalidForm = false;
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.auth.loggedIn()
        this.router.navigate(['home'])
      }else {
        this.errorMessage = this.responseData.message;
        this.isInvalidForm = true;
      }
    })
  }

  loginAsProfessor(){
    var value = this.loginForm.value;
    value.role = 'professor'
    this.auth.loginAsProfessor(value).subscribe(x => {
      this.responseData = x;
      console.log(this.responseData);
      if(this.responseData.success === true){
        this.isInvalidForm = false;
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.auth.loggedIn()
        this.router.navigate(['home'])
      }else {
        this.errorMessage = this.responseData.message;
        this.isInvalidForm = true;
      }
    })
    // this.auth.checkProfessorCreditionals(this.loginForm.value)
    // this.router.navigate(['login'])
  }

  triggerProfessorLogin(){
    this.router.navigate(['topic/login'])
  }

  triggerisStudentLogin(){
    this.router.navigate(['login'])
  }
}
