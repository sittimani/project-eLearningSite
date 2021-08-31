import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationForm } from 'src/app/core/shared/class/registration';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { CustomValidatorService } from 'src/app/core/shared/validators/custom-validator.service';
import { AuthService } from '../../shared/service/auth.service';
import { UserProfileService } from '../../shared/service/user-profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title: string = "Registration Form"
  isAddUser: boolean = true
  isInvalidForm: boolean = false
  hide: boolean = true
  isUpdateForm: boolean = false;
  responseData: any;
  isProfessorUpdate: boolean = false;
  registrationForm!: FormGroup
  myRole!: string;
  id!: string;
  errorMessage: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userProfile: UserProfileService,
    private currentRoute: ActivatedRoute,
    private dialog: DialogService,
    private validator: CustomValidatorService) {

    this.registrationForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]*/)]],
      age: [, [Validators.required, Validators.min(15), Validators.max(60)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/[0-9]/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      workingAt: ['', [Validators.required]]
    }, { validator: validator.passwordMatchValidator("password", "confirmPassword") });

    this.loadForm()
  }

  ngOnInit(): void {
    this.auth.loggedIn()
    // for updateProfile
    if (!this.router.url.includes('updateProfile')) {
      if (this.auth.getToken()) {
        this.auth.verifyToken().subscribe(x => {
          this.router.navigate(['home'])
        })
      }
    }
  }

  addProfessor() {
    if (this.registrationForm.valid) {
      var value = this.registrationForm.value;
      value.role = 'professor'
      this.auth.registerNewProfessor(value).subscribe(x => {
        this.responseData = x
        if (this.responseData.success === true) {
          this.dialog.setDetails("Ok", "Cancel", "Your request was submitted to our admin for approval!!!");
          this.dialog.openDialog().afterClosed().subscribe(x => {
            this.router.navigate(['topic/login'])
          })
        } else {
          this.showMessage(this.responseData.message)
        }
      }, error => {
        this.showMessage("Internal Server Problem")
      })
    }
  }

  addStudent() {
    if (this.registrationForm.valid) {
      var value = this.registrationForm.value;
      value.role = 'student'
      this.auth.registerNewStudent(value).subscribe(x => {
        this.responseData = x;
        if (this.responseData.success === true) {
          this.auth.saveToken(this.responseData);
        } else {
          this.showMessage(this.responseData.message)
        }
      }, error => {
        this.showMessage("Internal server Problem")
      })
    }
  }

  showMessage(message: string) {
    this.dialog.setDetails('OK', "Cancel", message)
    this.dialog.openDialog()
  }

  updateUser() {
    if(this.registrationForm.valid){
      var valueToUpdate = this.registrationForm.value;
      this.userProfile.updateUser(this.id, valueToUpdate).subscribe(x => {
        this.responseData = x;
        if (this.responseData.success === false) {
          this.errorMessage = this.responseData.message
          this.isInvalidForm = true
        } else {
          this.auth.loggedIn()
          this.router.navigate(['home'])
        }
      })
    }
  }

  triggerStudentRegister() {
    this.router.navigate(['register'])
  }

  triggerProfessorRegister() {
    this.router.navigate(['topic/register'])
  }

  loadForm() {
    const href = this.router.url;
    // To load topic/register
    if (href.includes('topic')) {
      this.isAddUser = false;
    } else {
      this.registrationForm.get('workingAt')?.disable()
    }
    // To load updateProfile
    if (href.includes('updateProfile')) {
      this.title = 'Update User'
      this.disableFieldForUpdate();
      this.isUpdateForm = true;
      this.id = this.currentRoute.snapshot.params['id']
      this.auth.verifyToken().subscribe(res => {
        this.responseData = res;
        if (this.responseData.users.role.updateDocument) {
          this.loadProfessorData()
        } else {
          this.loadStudentData()
        }
      })
    }
  }

  loadProfessorData() {
    this.userProfile.getProfessorData(this.id).subscribe(x => {
      this.responseData = x;
      this.isProfessorUpdate = true;
      this.registrationForm.get('workingAt')?.enable()
      this.registrationForm.patchValue(this.responseData)
    }, error => {
      this.showMessage("Internal Server Problem")
    })
    this.myRole = 'professor'
  }

  loadStudentData() {
    this.userProfile.getUserData(this.id).subscribe(x => {
      this.responseData = x;
      this.registrationForm.get('workingAt')?.disable()
      this.registrationForm.patchValue(this.responseData)
    }, error => {
      this.showMessage("Internal server Problem");
    })
    this.myRole = 'student'
  }

  disableFieldForUpdate() {
    this.registrationForm.get('password')?.disable()
    this.registrationForm.get('confirmPassword')?.disable()
    this.registrationForm.get('email')?.disable()
  }

  public getField(name: any){
    return this.registrationForm.get(name) as FormControl
  }

  cancel(){
    this.router.navigate(['home'])
  }
}
