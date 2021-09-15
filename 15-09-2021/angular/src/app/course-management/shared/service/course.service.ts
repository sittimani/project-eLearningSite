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
    return this.http.get(this.serverAddress + 'course')
  }

  getPicName(picture: FormData) {
    return this.http.post(this.serverAddress + 'picture', picture)
  }

  uploadCourse(value: any) {
    return this.http.post(this.serverAddress + 'upload-course', value)
  }

  deleteCourse(name: any) {
    return this.http.delete(this.serverAddress + 'delete-course', { body: { courseName: name } })
  }
}
