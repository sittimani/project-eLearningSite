import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private serverAddess = 'http://localhost:8080/'
  private behaviorSubject: BehaviorSubject<any>;
  behaviorSubject$: Observable<any>;

  constructor(private http: HttpClient) { 
    this.behaviorSubject = new BehaviorSubject("no")
    this.behaviorSubject$ = this.behaviorSubject.asObservable()
  }

  // used in home route
  getAllCourse(){
    return this.http.get(this.serverAddess + 'getAllCourse')
  }

  // used in topic list (To get all topics for the course)
  getCourse(name:string){
    return this.http.get(this.serverAddess + 'getCourse/ '+ name)
  }

  updateCourse(value: any){
    return this.http.post(this.serverAddess + 'updateTopic', value)
  }

  getTopics(courseName: string){
    return this.http.post(this.serverAddess + 'getTopic', {courseName: courseName});
  }

  triggerUpdateTopicForm(value: any){
    this.behaviorSubject.next(value);
  }

}
