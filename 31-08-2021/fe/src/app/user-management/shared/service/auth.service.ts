import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverAddress = environment.serverAddress
  private behSubject: BehaviorSubject<any>;
  public behSubject$: Observable<any>

  constructor(private http: HttpClient, private dialog: DialogService, private router: Router) {
    this.behSubject = new BehaviorSubject(false)
    this.behSubject$ = this.behSubject.asObservable()
  }

  loggedIn() {
    if (this.getToken()) {
      this.behSubject.next(true)
    } else {
      this.behSubject.next(false)
    }
  }

  getToken() {
    return localStorage.getItem("token")
  }

  verifyToken() {
    return this.http.get(this.serverAddress + 'verifyToken');
  }

  loginAsStudent(value: any) {
    return this.http.post(this.serverAddress + 'login', value)
  }

  registerNewProfessor(value: any) {
    return this.http.post(this.serverAddress + 'professorRegister', value)
  }

  registerNewStudent(value: any) {
    return this.http.post(this.serverAddress + 'studentRegister', value)
  }

  updatePassword(value:any){
    return this.http.post(this.serverAddress + 'updatePassword', value)
  }

  saveToken(responseData: any){
    localStorage.setItem('token', responseData.data.accessToken);
    this.dialog.setDetails("Ok", "Cancel", responseData.message)
    this.dialog.openDialog().afterClosed().subscribe(x => {
      this.loggedIn();
      this.router.navigate(['home'])
    })
  }
}
