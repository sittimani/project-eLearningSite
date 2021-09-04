import { FormControl, FormGroup } from "@angular/forms";

export class LoginForm{
    constructor(public loginForm: FormGroup){
    }

    get email() {
        return this.loginForm.get('email') as FormControl
    }
    
    public get password() {
        return this.loginForm.get('password') as FormControl
    }

}