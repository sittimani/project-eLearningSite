import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Data, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { TopicService } from "src/app/topic-management";

@Injectable({
  providedIn: "root"
})
export class TopicResolverService implements Resolve<Data>{

  constructor(
    private topic: TopicService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Data> {
    const courseName = route.params["name"];
    return this.topic.getCourse(courseName);
  }
}
