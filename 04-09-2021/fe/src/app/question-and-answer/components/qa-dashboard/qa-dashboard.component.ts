import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';
import { QaService } from '../../shared/service/qa.service';

@Component({
  selector: 'app-qa-dashboard',
  templateUrl: './qa-dashboard.component.html',
  styleUrls: ['./qa-dashboard.component.css']
})
export class QaDashboardComponent implements OnInit {

  dataToDisplay: any = []
  roles: any;
  responseData: any;
  isStudent: boolean = true;
  userID!: string;
  userName!: string;
  isAnswerEditPage: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private qaService: QaService) {
    this.auth.loggedIn()
    if (this.auth.getToken()) {
      this.auth.verifyToken().subscribe(x => {
        this.responseData = x
        this.userID = this.responseData.users._id
        this.userName = this.responseData.users.name
        this.roles = this.responseData.users.role;
        if (this.router.url.includes('myAnswers')) {
          if(this.roles.createDocument){
            this.isAnswerEditPage = true;
            this.getDataForEdit()
          } else {
            this.router.navigate(['home'])
          }
        } else {
          console.log("check privillages")
          this.checkPrivillages(this.roles)
        }
      }, error => {
        this.router.navigate(['home'])
        this.toastr.error("Internal Server Problem", "Error")
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
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
    this.qaService.getMyquestions(this.responseData.users._id).subscribe(x => {
      this.responseData = x;
      console.log(this.responseData);
      
      if (this.responseData.success === true) {
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
      this.toastr.error("Internal Server Problem", "Error");
    })
  }

  getDataForProfessor() {
    this.qaService.getAllQuestions().subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.dataToDisplay = this.responseData.data;
      } else {
        this.toastr.error(this.responseData.message, "Error")
      }
    }, error => {
      this.toastr.error("Internal Server Problem", "Error")
    })
  }

  getDataForEdit() {
    this.qaService.getDataForEdit(this.userID).subscribe(x => {
      this.responseData = x;
      if (this.responseData.success === true) {
        this.dataToDisplay = this.responseData.data
      } else {
        this.toastr.error(this.responseData.message, "Error")
      }
    }, error => {
      this.toastr.error("Internal Server Problem", "Error")
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
          if (this.responseData.success === true) {
            this.toastr.success("You answered the question successfully", "Success")
            location.reload()
          } else {
            this.toastr.error(this.responseData.message, "Error")
          }
        }, error => {
          this.toastr.error("Internal Server Problem", "Error")
        })
      }
    })
  }

  triggerEditMyAnswerPage() {
    this.router.navigate(['Q&A/myAnswers'])
  }
}
