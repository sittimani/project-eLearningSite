

import { AbstractControl } from "@angular/forms";

export function phoneValidator(control: AbstractControl) {

    const reserved = /^[0-9]{1}$/.test(control.value);

    if (control.errors && !control.errors.invalidPhone) {
        return null;
    } else {
        return !reserved  ? { 'invalidPhone': { value: control.value } } : null;
    }

}
