import { AbstractControl } from "@angular/forms";

export function nameValidator(control: AbstractControl) {
    const reserved = /^[a-zA-Z]+$/.test(control.value);

    if (control.errors && !control.errors.nameFormat) {
        return null;
    } else {
        return !reserved ? { 'nameFormat': { value: control.value } } : null;
    }
}
