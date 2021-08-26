import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles = {
    readDocument: true,
    createDocument: false,
    updateDocument: false,
    deleteDocument: false,
    createCourse: false
  }
  subject = new Subject()
  private serverAddress = 'http://localhost:8080/'

  constructor(private http:HttpClient) { }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
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
    this.roles.readDocument = true;
    this.roles.createDocument = true;
    this.roles.updateDocument = true;
    this.subject.next(1);
  }

  logoutUser(){
    this.roles.readDocument = false;
    this.roles.createCourse = false;
    this.roles.updateDocument = false;
    
    this.subject.next(1);
  }
}
