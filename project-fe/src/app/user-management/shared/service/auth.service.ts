import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  LoginCreditionals,
  LoginResponse,
  UserInformation,
  ResetPassword,
  UserDetails
} from "../..";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private serverAddress = environment.serverAddress
  private behSubject: BehaviorSubject<boolean>;
  public behSubject$: Observable<boolean>

  constructor(private http: HttpClient) {
    this.behSubject = new BehaviorSubject(Boolean(false))
    this.behSubject$ = this.behSubject.asObservable()
  }

  public loggedIn(): void {
    if (this.getToken()) {
      this.behSubject.next(true)
    } else {
      this.behSubject.next(false)
    }
  }

  public getToken(): string | null {
    return localStorage.getItem("token")
  }

  public loginAsUser(value: LoginCreditionals): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.serverAddress + "login", value)
  }

  public registerAsUser(value: UserInformation): Observable<string> {
    return this.http.post<string>(this.serverAddress + "register", value)
  }

  public updatePassword(value: ResetPassword): Observable<string> {
    return this.http.post<string>(this.serverAddress + "update-password", value)
  }

  public forgotPassword(value: LoginCreditionals): Observable<string> {
    return this.http.post<string>(this.serverAddress + "forgot-password", value)
  }

  public setToken(responseData: LoginResponse) {
    localStorage.setItem("token", responseData.accessToken);
    localStorage.setItem("user", JSON.stringify(responseData.user.users))
    localStorage.setItem("menu", JSON.stringify(responseData.menu))
    this.loggedIn()
  }

  public getUserDetails(): UserDetails {
    const details: any = localStorage.getItem("user")
    const originalData = JSON.parse(details)
    return originalData
  }

  public logOut(): void {
    localStorage.clear()
    this.loggedIn()
  }
}
