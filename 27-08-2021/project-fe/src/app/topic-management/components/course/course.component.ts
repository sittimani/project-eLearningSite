import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from 'src/app/topic-management/shared/service/topic.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public roles: any = {
    updateDocument: false
  }
  topicsDisplayed: any[] = []
  keysDisplayed: any[] = []
  keys!: any[]
  courseName: string = '';
  course: any
  responseData: any;
  overView: any = {};

  constructor(private auth: AuthService, private topic: TopicService, private router: Router, private currentRoute: ActivatedRoute) {
    //this.roles = this.auth.roles
    this.auth.loggedIn();
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.roles = this.responseData.users.role;
      this.courseName = this.currentRoute.snapshot.params['name']
      this.topic.getCourse(this.courseName).subscribe(x => {
        this.responseData = x;
        this.course = this.responseData.data[0]
        this.reStructureData(this.course)
        console.log(this.keysDisplayed)
        console.log(this.topicsDisplayed)
      })
    }, error => {
      console.log(error)
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  ngOnInit(): void {
  }
  updateTopic(index: number) {
    const values = {
      courseName: this.courseName,
      topicName: this.keysDisplayed[index],
      documentLink: this.topicsDisplayed[index].documentLink,
      toturialLink: this.topicsDisplayed[index].toturialLink
    }
    this.topic.triggerUpdateTopicForm(values);
    this.router.navigate(['topic/update'])
  }

  reStructureData(object: any) {
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      if (key === 'overview') {
        this.overView = object[key]
      } else if (key == '_id' || key === 'courseName') {

      } else {
        this.keysDisplayed.push(key)
        this.topicsDisplayed.push(object[key])
      }
    })
  }
}