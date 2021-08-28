import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private serverAddress = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }

  getPicName(picture: FormData){
    return this.http.post(this.serverAddress + 'picture', picture)
  }

  uploadCourse(value: any){
    return this.http.post(this.serverAddress + 'uploadCourse', value)
  }
}
