import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private serverAddress = environment.serverAddress
  
  constructor(private http: HttpClient) { }

  getAllCourse() {
    return this.http.get(this.serverAddress + 'getAllCourse')
  }

  getPicName(picture: FormData) {
    return this.http.post(this.serverAddress + 'picture', picture)
  }

  uploadCourse(value: any) {
    return this.http.post(this.serverAddress + 'uploadCourse', value)
  }

  deleteCourse(name: any) {
    return this.http.delete(this.serverAddress + 'deleteCourse', { body: { courseName: name } })
  }
}
