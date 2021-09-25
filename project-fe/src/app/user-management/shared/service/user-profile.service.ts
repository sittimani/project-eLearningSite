import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserInformation, userAuth, UpdatePermission } from "../..";

@Injectable({
  providedIn: "root"
})

export class UserProfileService {

  private serverAddress = environment.serverAddress;

  constructor(private http: HttpClient) { }

  public getUserData(id: string): Observable<UserInformation> {
    return this.http.get<UserInformation>(this.serverAddress + "my-details/" + id);
  }

  public updateUser(id: string, value: UserInformation): Observable<string> {
    return this.http.put<string>(this.serverAddress + "update-profile/" + id, value);
  }

  public getPendingProfessor(): Observable<userAuth[]> {
    return this.http.get<userAuth[]>(this.serverAddress + "pending-professor");
  }

  public userPermission(value: UpdatePermission): Observable<string> {
    return this.http.put<string>(this.serverAddress + "update-permission", value);
  }
}
