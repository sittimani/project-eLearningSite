import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from 'src/app/core';
import { AuthService } from '../..';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  public passwordForm!: FormGroup
  public isInvalidForm: boolean = false;
  public isHide: boolean = true
  public errorMessage: string = ''
  public title: string = 'Password Reset Form'
  private responseData!: any;
  private id!: any

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: passwordMatchValidator('password', 'confirmPassword') })
  }

  ngOnInit(): void {
    this.auth.loggedIn()
    if(this.auth.getToken()){
      this.responseData = this.auth.getUserDetails()
      this.id = this.responseData._id
    } else {
      this.router.navigate(['login'])
    }
  }

  changePassword() {
    var value = {
      id: this.id,
      oldPassword: this.passwordForm.get('oldPassword')?.value,
      newPassword: this.passwordForm.get('password')?.value
    }
    this.auth.updatePassword(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.statusCode === 200) {
        this.toastr.success(this.responseData.message, "Success")
        this.router.navigate(['home'])
      } else {
        this.errorMessage = this.responseData.message
        this.isInvalidForm = true;
      }
    })
  }

  public getField(name: any) {
    return this.passwordForm.get(name) as FormControl
  }

}
