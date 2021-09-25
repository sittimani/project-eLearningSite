import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm!:FormGroup
  isInvalidForm = false;
  hide = true
  errorMessage = ''
  formName = 'Password Reset Form'
  responseData!:any;
  id!:any

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
    this.auth.loggedIn()
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.id = this.responseData.users._id
      console.log(this.responseData)
    })
  }

  changePassword(){
    console.log(this.passwordForm.value)
  }

}
