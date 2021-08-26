import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';

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
  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    const href = this.router.url;
    if (href.includes('topic')) {
      this.addUserButton = false;
    }
    if (href.includes('updateprofile')) {
      this.formName = 'Update User'
      this.updateForm = true;
    }
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



  ngOnInit(): void {
  }

  addNewProfessor() {
    var value = this.registrationForm.value;
    value.role = 'professor'
    this.auth.registerNewProfessor(value).subscribe(x => {
      this.responseData = x
      if(this.responseData.success === true){
        this.router.navigate(['topic/login'])
      }
    })

  }

  addnewUser() {
    var value = this.registrationForm.value;
    value.role = 'student'
    this.auth.registerNewStudent(value).subscribe(x => {
      this.responseData = x;
      if(this.responseData.success === true){
        localStorage.setItem('token', this.responseData.data.accessToken);
        this.auth.roles = this.responseData.roles;
        this.router.navigate(['home'])
      }
      console.log(x)
    })

  }

  updateUser() {
    if (this.registrationForm.valid) {
      this.invalidForm = false
    } else {
      this.invalidForm = true;
    }
  }

  triggerStudentRegister() {
    this.router.navigate(['register'])
  }

  triggerProfessorRegister() {
    this.router.navigate(['topic/register'])
  }


}
