import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Topic } from "src/app/topic-management";
import { environment } from "src/environments/environment";
import { CourseForm } from "../..";

@Injectable({
  providedIn: "root"
})
export class CourseService {

  private serverAddress = environment.serverAddress

  constructor(private http: HttpClient) { }

  public getAllCourse(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.serverAddress + "course")
  }

  public getPicName(picture: FormData): Observable<string> {
    return this.http.post<string>(this.serverAddress + "picture", picture)
  }

  public uploadCourse(value: CourseForm): Observable<string> {
    return this.http.post<string>(this.serverAddress + "upload-course", value)
  }

  public deleteCourse(name: string): Observable<string> {
    return this.http.delete<string>(this.serverAddress + "delete-course", { body: { courseName: name } })
  }
}
