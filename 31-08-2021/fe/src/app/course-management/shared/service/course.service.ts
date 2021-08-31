import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private serverAddress = environment.serverAddress
  constructor(private http: HttpClient) { }

  getPicName(picture: FormData){
    return this.http.post(this.serverAddress + 'picture', picture)
  }

  uploadCourse(value: any){
    return this.http.post(this.serverAddress + 'uploadCourse', value)
  }
}
