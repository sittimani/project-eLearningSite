import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './core/shared/service/loader.service';
import { QaService } from './question-and-answer/shared/service/qa.service';
import { AuthService } from './user-management/shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'iLearn';
  public isOpen: boolean = false;
  public isLoggedIn: boolean = false;
  public userName!: string;
  public userId!: string;
  public roles: any = {
    createCourse: false
  }
  private responseData: any
  public isLoading!: boolean


  constructor(
    private auth: AuthService,
    private router: Router,
    public loader: LoaderService,
    private qaService: QaService,
    private toastr: ToastrService) {

    this.auth.behSubject$.subscribe(x => {
      if (x) {
        this.responseData = this.auth.getUserDetails()
        this.isLoggedIn = true;
        this.userName = this.responseData.name;
        this.userId = this.responseData._id;
        this.roles = this.responseData.role;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
    this.loader.isLoading.subscribe(x => {
      this.isLoading = x;
    })
  }

  updateProfile() {
    this.router.navigate(['updateProfile/' + this.userId])
  }

  takeQuestion() {
    this.qaService.openInputDialog().afterClosed().subscribe(x => {
      if (x) {
        const value = {
          studentID: this.userId,
          studentName: this.userName,
          question: this.qaService.question,
          isAnswered: false
        }
        this.qaService.uploadQuestion(value).subscribe(x => {
          this.responseData = x;
          this.toastr.success(this.responseData.data, "Success")
          location.reload()
        })
      }
    })
  }

  logout() {
    this.auth.logOut()
    this.roles.createCourse = false

  }

}
