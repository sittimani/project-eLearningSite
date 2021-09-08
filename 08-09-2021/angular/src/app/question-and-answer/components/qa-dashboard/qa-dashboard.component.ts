import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { QaService } from '../..';


@Component({
  selector: 'app-qa-dashboard',
  templateUrl: './qa-dashboard.component.html',
  styleUrls: ['./qa-dashboard.component.css']
})
export class QaDashboardComponent {

  public dataToDisplay: any = []
  public roles: any;
  private responseData: any;
  public isStudent: boolean = true;
  private userID!: string;
  private userName!: string;
  public isAnswerEditPage: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private qaService: QaService) {

    this.auth.loggedIn()
    if (this.auth.getToken()) {
      this.responseData = this.auth.getUserDetails()
      this.userID = this.responseData._id
      this.userName = this.responseData.name
      this.roles = this.responseData.role
      if (this.router.url.includes('myAnswers')) {
        if (this.roles.createDocument) {
          this.isAnswerEditPage = true;
          this.getDataForEdit()
        } else {
          console.log("hi")
          this.router.navigate(['home'])
        }
      } else {
        this.checkPrivillages(this.roles)
      }
    } else {
      this.router.navigate(['login'])
    }
  }

  checkPrivillages(role: any) {
    if (role.readDocument && !role.createCourse && !role.updateDocument) {
      this.isStudent = true
      this.getDataForStudent()
    } else {
      this.isStudent = false;
      this.getDataForProfessor()
    }
  }

  getDataForStudent() {
    this.qaService.getMyquestions(this.responseData._id).subscribe(x => {
      this.responseData = x;
      if(this.responseData.statusCode === 401){
        this.auth.logOut()
      }
      if (this.responseData.statusCode === 200) {
        this.responseData = this.responseData.data;
        this.responseData.forEach((element: any, index: number) => {
          if (!element.isAnswered) {
            this.responseData[index].answer = "Yet to be answered"
            this.responseData[index].professorName = "Nil"
          }
        });
        this.dataToDisplay = this.responseData
      } else {
        this.toastr.error(this.responseData.message, "Error")
      }
    }, error => {
      this.toastr.error(Constants.serverProblem, "Error");
    })
  }

  getDataForProfessor() {
    this.qaService.getAllQuestions().subscribe(x => {
      this.responseData = x;
      if(this.responseData.statusCode === 401){
        this.auth.logOut()
      }
      if (this.responseData.statusCode === 200) {
        this.dataToDisplay = this.responseData.data;
      } else {
        this.toastr.error(this.responseData.message, "Error")
      }
    }, error => {
      this.toastr.error(Constants.serverProblem, "Error")
    })
  }

  getDataForEdit() {
    this.qaService.getDataForEdit(this.userID).subscribe(x => {
      this.responseData = x;
      if(this.responseData.statusCode === 401){
        this.auth.logOut()
      }
      if (this.responseData.statusCode === 200) {
        this.dataToDisplay = this.responseData.data
      } else {
        this.toastr.error(this.responseData.message, "Error")
      }
    }, error => {
      this.toastr.error(Constants.serverProblem, "Error")
    })
  }

  answer(id: any) {
    this.qaService.isQuestionForm = false;
    this.qaService.openInputDialog().afterClosed().subscribe(x => {
      if (x === true) {
        const ans = this.qaService.answer;
        const val = {
          questionID: id,
          professorID: this.userID,
          professorName: this.userName,
          answer: ans,
          isAnswered: true
        }
        this.qaService.submitAnswer(val).subscribe(x => {
          this.responseData = x;
          if(this.responseData.statusCode === 401){
            this.auth.logOut()
          }
          if (this.responseData.statusCode === 200) {
            this.toastr.success(this.responseData.message, "Success")
            location.reload()
          } else {
            this.toastr.error(this.responseData.message, "Error")
          }
        }, error => {
          this.toastr.error(Constants.serverProblem, "Error")
        })
      }
    })
  }

  triggerEditMyAnswerPage() {
    this.router.navigate(['Q&A/myAnswers'])
  }
}
