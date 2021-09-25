import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { AuthService } from '../../shared/service/auth.service';
import { UserProfileService } from '../../shared/service/user-profile.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  formName: string = "Registration Form"
  addUserButton: boolean = true
  invalidForm: boolean = false
  hide: boolean = true
  updateForm: boolean = false;
  responseData: any;
  isProfessorUpdate: boolean = false;
  registrationForm!: FormGroup
  myRole!: string;
  id!: string;
  errorMessage: string = 'Please Fill the form correctly';

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    private router: Router, private userProfile: UserProfileService,
    private currentRoute: ActivatedRoute, private dialog: DialogService) {
    this.auth.loggedIn()
    if (!this.router.url.includes('updateProfile')) {
      if (this.auth.getToken()) {
        this.auth.verifyToken().subscribe(x => {
          this.router.navigate(['home'])
        })
      }
    }
    this.loadForm()
    this.initializeForm()
  }

  initializeForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]*/)]],
      age: [, [Validators.required, Validators.min(1)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/[0-9]/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      workingAt: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  addNewProfessor() {
    var value = this.registrationForm.value;
    value.role = 'professor'
    this.auth.registerNewProfessor(value).subscribe(x => {
      this.responseData = x
      if (this.responseData.success === true) {
        this.dialog.setDetails("Ok", "Cancel", this.responseData.message);
        this.dialog.openDialog().afterClosed().subscribe(x => {
          this.router.navigate(['topic/login'])
        })
      } else {
        this.dialog.setDetails("Ok", "Cancel", this.responseData.message);
      }
    })
  }

  addnewUser() {
    var value = this.registrationForm.value;
    value.role = 'student'
    this.auth.registerNewStudent(value).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.dialog.setDetails("Ok", "Cancel", this.responseData.message);
        this.dialog.openDialog().afterClosed().subscribe(x => {
          this.auth.loggedIn()
          this.router.navigate(['home'])
        })

      }
    })
  }

  updateUser() {
    var valueToUpdate = this.registrationForm.value;
    this.userProfile.updateUser(this.myRole, this.id, valueToUpdate).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === false) {
        this.errorMessage = this.responseData.message
        this.invalidForm = true
      } else {
        this.auth.loggedIn()
        this.router.navigate(['home'])
      }
    })
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
      this.addUserButton = false;
    }
    // To load updateProfile
    if (href.includes('updateProfile')) {
      this.formName = 'Update User'
      this.updateForm = true;
      this.id = this.currentRoute.snapshot.params['id']
      this.auth.verifyToken().subscribe(res => {
        this.responseData = res;
        if (this.responseData.users.role.updateDocument) {
          this.userProfile.getProfessorData(this.id).subscribe(x => {
            this.responseData = x;
            this.isProfessorUpdate = true;
            this.registrationForm.patchValue(this.responseData)
          })
          this.myRole = 'professor'
        } else {
          this.userProfile.getUserData(this.id).subscribe(x => {
            this.responseData = x;
            this.registrationForm.patchValue(this.responseData)
          })
          this.myRole = 'student'
        }
      })
    }
  }

  public get name() {
    return this.registrationForm.get('name') as FormControl;
  }

  public get age() {
    return this.registrationForm.get('age') as FormControl;
  }

  public get phone() {
    return this.registrationForm.get('phone') as FormControl
  }

  public get email() {
    return this.registrationForm.get('email') as FormControl
  }

  public get password() {
    return this.registrationForm.get('password') as FormControl
  }

  public get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl
  }

  public get work() {
    return this.registrationForm.get('workingAt') as FormControl
  }

}
