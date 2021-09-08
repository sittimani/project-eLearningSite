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
    private dialog: DialogService,
    private router: Router,
    private toastr: ToastrService) {
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
    const d = localStorage.getItem('token');
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
    return this.http.post(this.serverAddress + 'updatePassword', value)
  }

  forgotPassword(value: any) {
    return this.http.post(this.serverAddress + 'forgotPassword', value)
  }

  saveToken(responseData: any) {
    localStorage.setItem('token', responseData.data.accessToken);
    console.log(responseData)
    localStorage.setItem('user',JSON.stringify( responseData.data.user.users))
    this.loggedIn()
    this.router.navigate(['home'])
    this.toastr.success('Logged in successfully', "Success")
  }

  getUserDetails(){
    const details:any = localStorage.getItem('user')
    const originalData = JSON.parse(details)
    return originalData
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['login'])
    this.toastr.error("Unauthorized access, please login to continue !!!")
  }
}
