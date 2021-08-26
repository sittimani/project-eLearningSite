import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from 'src/app/topic-management/shared/service/topic.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public roles;
  topics:any[] = []
  keys:any[] = []
  courseName:string;
  course:any = {
        _id: 'angular',
        components: {
            teacherID: "1234",
            toturialLink: "https://toturialLink",
            documentLink: "https://document"
        },
        databinding: {
            teacherID: "1235",
            toturialLink: "https://toturialLink1",
            documentLink: "https://document1"
        },
        material: {
            teacherID: "1236",
            toturialLink: "https://toturialLink2",
            documentLink: "https://document2"
        },
        lazyloading: {
            teacherID: "1236",
            toturialLink: "https://toturialLink3",
            documentLink: "https://document3"
        }
    }

  constructor(private auth: AuthService, private topic: TopicService, private router: Router) {
    this.roles = this.auth.roles 
    this.reStructureData(this.course)
    this.courseName = this.topics[0];
    this.keys = this.keys.splice(1)
    this.topics = this.topics.splice(1)
  }

  ngOnInit(): void {
  }
  updateTopic(index:number){
    const values = {
      courseName: this.courseName,
      topicName: this.keys[index],
      documentLink: this.topics[index].documentLink,
      toturialLink: this.topics[index].toturialLink
    }
    this.topic.triggerUpdateTopicForm(values);
    this.router.navigate(['professor/update'])
  } 

  reStructureData(object:any){
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      this.topics.push(object[key])
    })
  }

}

