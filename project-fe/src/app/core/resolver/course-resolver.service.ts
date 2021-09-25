import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Data, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { CourseService } from "src/app/course-management";

@Injectable({
  providedIn: "root"
})
export class CourseResolverService implements Resolve<Data> {

  constructor(private course: CourseService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Data> {
    return this.course.getAllCourse();
  }
}
