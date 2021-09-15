import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private serverAddress = environment.serverAddress
  constructor(private http:HttpClient) { }

  getUserData(id:string) {
    return this.http.get(this.serverAddress + 'my-details/' + id);
  }

  updateUser(id:string, value:any) {
    return this.http.put(this.serverAddress + 'update-profile/' + id, value)
  }

  getPendingProfessor(){
    return this.http.get(this.serverAddress +'pending-professor')
  }

  userPermission(val: any){
    return this.http.post(this.serverAddress + 'update-permission', val)
  }
}
