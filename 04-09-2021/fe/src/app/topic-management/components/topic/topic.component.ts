import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core/shared/service/dialog.service';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from '../../shared/service/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {

  public roles: any = {
    updateDocument: false
  }
  topicsDisplayed: any[] = []
  keysDisplayed: any[] = []
  keys!: any[]
  courseName: string = '';
  course: any
  isNoCourse = false;
  responseData: any;
  overView: any = {};

  constructor(
    private auth: AuthService,
    private topic: TopicService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private dialog: DialogService,
    private toastr: ToastrService) {

    this.auth.loggedIn();
    this.auth.verifyToken().subscribe(x => {
      this.responseData = x;
      this.roles = this.responseData.users.role;
      this.courseName = this.currentRoute.snapshot.params['name']
      this.topic.getCourse(this.courseName).subscribe(x => {
        this.responseData = x;
        if (this.responseData.data[0]) {
          this.course = this.responseData.data[0]
          this.reStructureData(this.course)
        } else {
          this.isNoCourse = true;
        }
      })
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.router.navigate(['login'])
      }
    })
  }

  updateTopic(index: number) {
    const topicName = this.keysDisplayed[index]
    this.topic.triggerUpdateTopicForm(topicName);
    this.router.navigate(['topic/update/' + this.courseName])
  }

  deleteTopic(index: number) {
    const topicName = this.keysDisplayed[index]
    this.dialog.setDetails("Ok", "Cancel", "Are you sure, you want to delete " + topicName + " topic?")
    this.dialog.openDialog().afterClosed().subscribe(x => {
      if (x === true) {
        this.topic.deleteTopic(this.courseName, topicName).subscribe(x => {
          this.responseData = x;
          if (this.responseData.success === true) {
            this.toastr.success(this.responseData.message, "Success")
            this.router.navigate(['home'])
          } else{
            this.toastr.error(this.responseData.message, "Error")
          }
        })
      }
    })
  }

  reStructureData(object: any) {
    this.keys = Object.keys(object);
    this.keys.forEach(key => {
      if (key === 'overview') {
        this.overView = object[key]
      } else if (key == '_id' || key === 'courseName' || key === 'updatedAt' || key === 'createdAt') {

      } else {
        this.keysDisplayed.push(key)
        this.topicsDisplayed.push(object[key])
      }
    })
  }

  triggerAddTopic() {
    this.router.navigate(['topic/add/' + this.courseName])
  }
}
