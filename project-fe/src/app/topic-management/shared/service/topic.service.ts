import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Topic, TopicDetail } from "../..";

@Injectable({
  providedIn: "root"
})
export class TopicService {

  private serverAddess = environment.serverAddress
  private shareTopic: BehaviorSubject<string>;
  public shareTopic$: Observable<string>;

  constructor(private http: HttpClient) {
    this.shareTopic = new BehaviorSubject("no")
    this.shareTopic$ = this.shareTopic.asObservable()
  }
  
  public getCourse(name: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.serverAddess + "course-topic/ " + name)
  }

  public updateCourse(value: TopicDetail): Observable<string> {
    return this.http.put<string>(this.serverAddess + "update-topic", value)
  }

  public getTopics(courseName: string): Observable<Topic> {
    return this.http.post<Topic>(this.serverAddess + "topics", { courseName: courseName });
  }

  public deleteTopic(courseName: string, topicName: string): Observable<string> {
    return this.http.delete<string>(this.serverAddess + "delete-topic", { body: { courseName: courseName, topicName: topicName } })
  }

  public triggerUpdateTopicForm(topic: string) {
    this.shareTopic.next(topic);
  }

}
