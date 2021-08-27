import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  getAllCourse(){
    return this.http.get(this.serverAddess + 'getAllCourse')
  }

  getCourse(name:string){
    return this.http.get(this.serverAddess + 'getCourse/ '+ name)
  }

  triggerUpdateTopicForm(value: any){
    this.behaviorSubject.next(value);
  }
}
