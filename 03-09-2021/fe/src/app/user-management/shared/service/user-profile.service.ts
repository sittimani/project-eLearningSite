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
    return this.http.get(this.serverAddress + 'getData/' + id);
  }

  getProfessorData(id: string) {
    return this.http.get(this.serverAddress + 'getData/' + id)
  }

  updateUser(id:string, value:any) {
    return this.http.put(this.serverAddress + 'update/' + id, value)
  }

  getPendingProfessor(){
    return this.http.get(this.serverAddress +'getPendingProfessor')
  }

  userPermission(val: any){
    return this.http.post(this.serverAddress + 'userPermission', val)
  }
}
