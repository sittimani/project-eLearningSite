import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private behaviorSubject: BehaviorSubject<any>;
  behaviorSubject$: Observable<any>;

  constructor() { 
    this.behaviorSubject = new BehaviorSubject("no")
    this.behaviorSubject$ = this.behaviorSubject.asObservable()
  }

  triggerUpdateTopicForm(value: any){
    this.behaviorSubject.next(value);
  }
}
