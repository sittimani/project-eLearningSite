export enum UserErrors {
    InvalidForm = "Please Fill the form Correctly",
    InvalidFile = "Please Use a png or jpg file!!!",
    NoDataFound = "No Data Found !!!",
    InvalidEmail = "Invalid Email Address",
    Mismatch = "Password and confirm password not match",
    InvalidPhone = "Invalid Phone Number",
    MinAge = "Age Must be above 15 years",
    MaxAge = "Age Must be below 60",
    InvalidName = "Name must not have numbers"
}

export class ErrorMessage {
    constructor() { }

    requiredError(field: string): string {
        return field + " is Required";
    }

    minLengthError(field: string, length: number): string {
        return field + " should be minimum " + length + " characters";
    }
}

