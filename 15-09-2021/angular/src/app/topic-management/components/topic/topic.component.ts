import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseOverView, DialogService, Roles } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { TopicService } from '../..';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent{

  public roles!: Roles;
  public keysDisplayed: string[] = [];
  private keys!: string[];
  public courseName: string = '';
  private course: any
  public topicsDisplayed: any = [];
  public isNoCourse: boolean = false;
  private responseData: any;
  public overView: CourseOverView = {
    description: ''
  };

  constructor(
    private auth: AuthService,
    private topic: TopicService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {

    this.responseData = this.auth.getUserDetails();
    if (this.responseData) {
      this.roles = this.responseData.role;
    }
    this.courseName = this.currentRoute.snapshot.params['name'];
    this.getCourse();
  }

  getCourse() {
    this.topicsDisplayed = []
    this.topic.getCourse(this.courseName).subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      if (this.responseData[0]) {
        this.course = this.responseData[0];
        this.reStructureData(this.course);
      } else {
        this.isNoCourse = true;
      }
    })
  }

  reStructureData(object: any) {
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      if (key === 'overview') {
        this.overView = object[key]
      } else if (!(key == '_id' || key === 'courseName' || key === 'updatedAt' || key === 'createdAt')) {
        this.keysDisplayed.push(key)
        this.topicsDisplayed.push(object[key])
      }
    })
  }


  updateTopic(index: number) {
    const topicName = this.keysDisplayed[index];
    this.topic.triggerUpdateTopicForm(topicName);
    this.router.navigate(['topic/update/' + this.courseName]);
  }

  deleteTopic(index: number) {
    const topicName = this.keysDisplayed[index];
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + topicName + " topic?");
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x) {
        this.topic.deleteTopic(this.courseName, topicName).subscribe(x => {
          this.responseData = x;
          this.toastr.success(this.responseData.data, "Success");
          this.getCourse();
        })
      }
    })
  }

  triggerAddTopic() {
    this.router.navigate(['topic/add/' + this.courseName])
  }
}
