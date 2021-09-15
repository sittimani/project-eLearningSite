import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserErrors, passwordMatchValidator } from 'src/app/core';
import { AuthService, UserProfileService } from '../..';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public title: string = "Registration Form"
  public isAddUser: boolean = true
  public isHide: boolean = true
  public isUpdateForm: boolean = false;
  private responseData: any;
  public isProfessorUpdate: boolean = false;
  public registrationForm!: FormGroup
  private id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userProfile: UserProfileService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService) {

    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z]*')]],
      age: [, [Validators.required, Validators.min(15), Validators.max(60)]],
      gender: ['', [Validators.required]],
      phone: [, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      workingAt: ['', [Validators.required]]
    }, { validator: passwordMatchValidator("password", "confirmPassword") });

    this.loadForm()
    if (this.router.url.includes('update-profile')) {
      this.loadDataForUpdate();
    } else {
      if (this.auth.getToken()) {
        this.router.navigate(['home'])
      }
    }
  }

  addUser() {
    if (this.registrationForm.valid) {
      var value = this.registrationForm.value;
      const href = this.router.url;
      href.includes('topic') ? value.role = 'professor' : value.role = 'student'
      this.registerUser(value)
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error")
    }
  }

  registerUser(value: any) {
    this.auth.registerAsUser(value).subscribe(x => {
      this.responseData = x;
      this.toastr.success(this.responseData.data, "Success")
      this.router.navigate(['login'])
    })
  }

  updateUser() {
    if (this.registrationForm.valid) {
      var valueToUpdate = this.registrationForm.value;
      this.userProfile.updateUser(this.id, valueToUpdate).subscribe(x => {
        this.responseData = x;
        this.toastr.success(this.responseData.data, "Success");
        this.router.navigate(['home']);
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  loadForm() {
    const href = this.router.url;
    // To load topic/register
    href.includes('topic') ? this.isAddUser = false : this.registrationForm.get('workingAt')?.disable();
  }

  loadDataForUpdate() {
    this.title = 'Update User';
    this.disableFieldForUpdate();
    this.isUpdateForm = true;
    this.id = this.currentRoute.snapshot.params['id'];
    this.responseData = this.auth.getUserDetails();
    if (this.responseData.role.updateDocument) {
      this.isProfessorUpdate = true;
      this.registrationForm.get('workingAt')?.enable();
      this.loadUserData();
    } else {
      this.registrationForm.get('workingAt')?.disable();
      this.loadUserData();
    }
  }

  loadUserData() {
    this.userProfile.getUserData(this.id).subscribe(x => {
      this.responseData = x;
      if (!this.responseData.data) {
        this.toastr.error("Invalid User", "Error")
        this.router.navigate(['home'])    
      } else {
        this.registrationForm.patchValue(this.responseData.data);
      }
    })
  }

  disableFieldForUpdate() {
    this.registrationForm.get('password')?.disable();
    this.registrationForm.get('confirmPassword')?.disable();
    this.registrationForm.get('email')?.disable();
  }

  public getField(name: any) {
    return this.registrationForm.get(name) as FormControl;
  }

  cancel() {
    this.router.navigate(['home']);
  }

  triggerStudentRegister() {
    this.router.navigate(['register']);
  }

  triggerProfessorRegister() {
    this.router.navigate(['topic/register']);
  }
}
