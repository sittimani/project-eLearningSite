import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private serverAddress = 'http://localhost:8080/'
  constructor(private http:HttpClient) { }

  getUserData(id:string) {
    return this.http.get(this.serverAddress + 'getStudentData/' + id);
  }

  getProfessorData(id: string) {
    return this.http.get(this.serverAddress + 'getProfessorData/' + id)
  }

  updateUser(role:string, id:string, value:any) {
    if(role === 'student'){
      return this.http.put(this.serverAddress + 'updateStudent/' + id, value)
    }else{
      return this.http.put(this.serverAddress + 'updateProfessor/' + id, value)
    }
  }
}
