import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseForm, Topic } from "src/app/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CourseService {

  private serverAddress = environment.serverAddress

  constructor(private http: HttpClient) { }

  getAllCourse(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.serverAddress + "course")
  }

  getPicName(picture: FormData): Observable<string> {
    return this.http.post<string>(this.serverAddress + "picture", picture)
  }

  uploadCourse(value: CourseForm): Observable<string> {
    return this.http.post<string>(this.serverAddress + "upload-course", value)
  }

  deleteCourse(name: string): Observable<string> {
    return this.http.delete<string>(this.serverAddress + "delete-course", { body: { courseName: name } })
  }
}
