import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private http: HttpClient,
    private router: Router) {
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

  loginAsUser(value: any) {
    return this.http.post(this.serverAddress + 'login', value)
  }

  registerAsUser(value: any) {
    return this.http.post(this.serverAddress + 'register', value)
  }

  updatePassword(value: any) {
    return this.http.post(this.serverAddress + 'update-password', value)
  }

  forgotPassword(value: any) {
    return this.http.post(this.serverAddress + 'forgot-password', value)
  }

  setToken(responseData: any) {
    localStorage.setItem('token', responseData.accessToken);
    localStorage.setItem('user',JSON.stringify( responseData.user.users))
    this.loggedIn()
    
  }

  getUserDetails(): any {
    const details:any = localStorage.getItem('user')
    const originalData = JSON.parse(details)
    return originalData
  }

  logOut(){
    localStorage.clear()
    this.loggedIn()
  }
}
