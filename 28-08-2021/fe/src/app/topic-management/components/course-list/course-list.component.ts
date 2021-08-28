import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from '../../shared/service/topic.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public roles:any = {
    readDocument: false,
    createDocument: false
  };
  public responseData:any = [];
  allCourse:any = []

  constructor(private auth: AuthService, private router: Router, private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.auth.loggedIn();
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.roles = this.responseData.users.role;
      this.getCourses();
    }, error => {
      console.log(error)
      if(error instanceof HttpErrorResponse){
        this.router.navigate(['login'])
      }
    })
  }

  getCourses(){
    this.topicService.getAllCourse().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      //console.log(this.responseData)
      this.responseData.forEach((document:any) => {
        var details = {
          id: document.id,
          name: document.courseName,
          shortDescription: document['overview']['shortDescription'],
          url: "http://localhost:8080/uploads/" + document['overview']['url']
        }
        this.allCourse.push(details)
      });
    })
  }

  triggerAddCourse(name: string) {
    this.router.navigate(['topic/add/' + name])
  }

  exploreCourse(name:string) {
    this.router.navigate(['course/' + name])
  }

}
