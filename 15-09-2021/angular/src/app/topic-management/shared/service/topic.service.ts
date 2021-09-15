import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private serverAddess = environment.serverAddress
  private behaviorSubject: BehaviorSubject<any>;
  public behaviorSubject$: Observable<any>;

  constructor(private http: HttpClient) {
    this.behaviorSubject = new BehaviorSubject("no")
    this.behaviorSubject$ = this.behaviorSubject.asObservable()
  }


  // used in topic list (To get all topics for the course)
  getCourse(name: string) {
    return this.http.get(this.serverAddess + 'course-topic/ ' + name)
  }

  updateCourse(value: any) {
    return this.http.put(this.serverAddess + 'update-topic', value)
  }

  getTopics(courseName: string) {
    return this.http.post(this.serverAddess + 'topics', { courseName: courseName });
  }

  deleteTopic(courseName: string, topicName: string) {
    return this.http.delete(this.serverAddess + 'delete-topic', { body: { courseName: courseName, topicName: topicName } })
  }


  triggerUpdateTopicForm(topic: any) {
    this.behaviorSubject.next(topic);
  }

}
