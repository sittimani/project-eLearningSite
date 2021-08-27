import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverAddress = 'http://localhost:8080/'
  private behSubject: BehaviorSubject<any>;
  public behSubject$: Observable<any>

    constructor(private http: HttpClient) {
      this.behSubject = new BehaviorSubject(false)
      this.behSubject$ = this.behSubject.asObservable()
    }

loggedIn(){
  if (this.getToken()) {
    this.behSubject.next(true)
  } else {
    this.behSubject.next(false)
  }
}


getToken(){
  return localStorage.getItem("token")
}

verifyToken(){
  return this.http.get('http://localhost:8080/verifyToken');
}

loginAsProfessor(value: any){
  return this.http.post(this.serverAddress + 'professorLogin', value);
}

loginAsStudent(value: any){
  return this.http.post(this.serverAddress + 'studentLogin', value)
}

registerNewProfessor(value: any){
  return this.http.post(this.serverAddress + 'professorRegister', value)
}

registerNewStudent(value: any){
  return this.http.post(this.serverAddress + 'studentRegister', value)
}

logoutUser(){
  
}
}
