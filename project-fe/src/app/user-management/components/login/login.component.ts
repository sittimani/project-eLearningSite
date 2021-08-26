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

  studentLogin: boolean = true
  hide:boolean = true
  invalidForm:boolean = false
  formName = 'Login Form'
  responseData:any

  loginForm:FormGroup
  constructor(private formBuilder: FormBuilder, private router:Router, private auth: AuthService) {
    const href = this.router.url;
    if(href.includes('topic')){
      this.studentLogin = false
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
      console.log(this.responseData)
    })
    // this.auth.checkStudentCreditionals(this.loginForm.value)
    // this.router.navigate(['home'])
  }

  loginAsProfessor(){
    var value = this.loginForm.value;
    value.role = 'professor'
    this.auth.loginAsProfessor(value).subscribe(x => {
      this.responseData = x;
      console.log(this.responseData)
    })
    // this.auth.checkProfessorCreditionals(this.loginForm.value)
    // this.router.navigate(['login'])
  }

  triggerProfessorLogin(){
    this.router.navigate(['topic/login'])
  }

  triggerStudentLogin(){
    this.router.navigate(['login'])
  }
}
