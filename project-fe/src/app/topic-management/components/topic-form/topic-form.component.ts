import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { TopicService } from '../../shared/service/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  addCourseForm: boolean = true;
  invalidForm: boolean = false;
  formName: string = 'Topic Adding Form'
  disable: boolean = false;
  roles;

  courseForm: FormGroup
  
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private topic: TopicService) {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required]],
      topicName: ['', [Validators.required]],
      documentLink: ['', [Validators.required]],
      toturialLink: ['', [Validators.required]]
    })
    this.roles = this.auth.roles;
    if(this.roles.createDocument == false || this.roles.updateDocument == false){
      this.router.navigate(['professor/login'])
    }

    this.topic.behaviorSubject$.subscribe(x => {
      if(x !== 'no'){
        this.addCourseForm = false;
        this.formName = 'Update Topic'
        this.courseForm.patchValue(x)
        console.log(x)
        this.courseForm.controls['courseName'].disable()
        this.courseForm.controls['topicName'].disable()
      }else{
        this.formName = 'Topic Adding Form'
        this.router.navigate(['professor/addtopic'])
      }
    })
   }

  ngOnInit(): void {
  }

  addTopic(){

  }

  updateTopic(){

  }

}
