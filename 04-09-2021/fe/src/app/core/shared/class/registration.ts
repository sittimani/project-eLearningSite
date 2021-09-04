import { FormControl, FormGroup } from "@angular/forms";

export class RegistrationForm {
  constructor(public registrationForm: FormGroup) {

  }

  public get name() {
    return this.registrationForm.get('name') as FormControl;
  }

  public get gender() {
    return this.registrationForm.get('gender') as FormControl;
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