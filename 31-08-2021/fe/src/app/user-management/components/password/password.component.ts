import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { CustomValidatorService } from 'src/app/core/shared/validators/custom-validator.service';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm!: FormGroup
  isInvalidForm = false;
  hide = true
  errorMessage = ''
  title = 'Password Reset Form'
  responseData!: any;
  id!: any

  constructor(
    private formBuilder: FormBuilder,
    private validator: CustomValidatorService,
    private auth: AuthService,
    private router: Router,
    private dialog: DialogService) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: validator.passwordMatchValidator('password', 'confirmPassword') })
  }

  ngOnInit(): void {
    this.auth.loggedIn()
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.id = this.responseData.users._id
    })
  }

  changePassword() {
    var value = {
      id: this.id,
      oldPassword: this.passwordForm.get('oldPassword')?.value,
      newPassword: this.passwordForm.get('password')?.value
    }
    this.auth.updatePassword(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.dialog.setDetails("Ok", "Cancel", "Password Changed successfully!!!")
        this.dialog.openDialog().afterClosed().subscribe(x => {
          this.router.navigate(['home'])
        })
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
