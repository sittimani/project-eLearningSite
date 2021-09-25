import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  LoginCreditionals,
  LoginResponse,
  UserInformation,
  ResetPassword,
  UserDetails,
  Roles
} from "../..";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private serverAddress = environment.serverAddress;
  private userLoggedIn: BehaviorSubject<boolean>;
  public userLoggedIn$: Observable<boolean>

  constructor(private http: HttpClient) {
    this.userLoggedIn = new BehaviorSubject(Boolean(false));
    this.userLoggedIn$ = this.userLoggedIn.asObservable();
  }

  public loggedIn(): void {
    this.getToken() ? this.userLoggedIn.next(true) : this.userLoggedIn.next(false);
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public loginAsUser(value: LoginCreditionals): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.serverAddress + "login", value);
  }

  public registerAsUser(value: UserInformation): Observable<string> {
    return this.http.post<string>(this.serverAddress + "register", value);
  }

  public updatePassword(value: ResetPassword): Observable<string> {
    return this.http.put<string>(this.serverAddress + "update-password", value);
  }

  public forgotPassword(value: LoginCreditionals): Observable<string> {
    return this.http.put<string>(this.serverAddress + "forgot-password", value);
  }

  public saveToken(responseData: LoginResponse) {
    localStorage.setItem("token", responseData.accessToken);
    localStorage.setItem("user", JSON.stringify(responseData.user.users));
    localStorage.setItem("menu", JSON.stringify(responseData.user.users.role.menu));
    this.loggedIn();
  }

  public getUserDetails(): UserDetails {
    const details = localStorage.getItem("user");
    let originalData;
    if (details)
      originalData = JSON.parse(details);
    return originalData;
  }

  public logOut(): void {
    localStorage.clear();
    this.loggedIn();
  }
}
