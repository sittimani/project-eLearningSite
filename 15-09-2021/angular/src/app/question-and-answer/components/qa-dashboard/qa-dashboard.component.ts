import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roles } from 'src/app/core';
import { AuthService } from 'src/app/user-management';
import { QaService } from '../..';


@Component({
  selector: 'app-qa-dashboard',
  templateUrl: './qa-dashboard.component.html',
  styleUrls: ['./qa-dashboard.component.css']
})
export class QaDashboardComponent {

  public dataToDisplay: any = []
  public roles!: Roles;
  private responseData: any;
  public isStudent: boolean = true;
  private userID!: string;
  private userName!: string;
  public isAnswerEditPage: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private qaService: QaService
  ) {

    this.responseData = this.auth.getUserDetails();
    if (this.responseData) {
      this.userID = this.responseData._id;
      this.userName = this.responseData.name;
      this.roles = this.responseData.role;
      if (this.router.url.includes('my-answers')) {
        if (this.roles.createDocument) {
          this.isAnswerEditPage = true;
          this.getDataForEdit();
        } else {
          this.router.navigate(['home']);
        }
      } else {
        this.checkPrivilages(this.roles);
      }
    }
  }

  checkPrivilages(role: Roles) {
    if (role.readDocument && !role.createCourse && !role.updateDocument) {
      this.isStudent = true;
      this.getDataForStudent();
    } else {
      this.isStudent = false;
      this.getDataForProfessor();
    }
  }

  getDataForStudent() {
    this.qaService.getMyquestions(this.responseData._id).subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      this.responseData.forEach((element: any, index: number) => {
        if (!element.isAnswered) {
          this.responseData[index].answer = "Yet to be answered";
          this.responseData[index].professorName = "Nil";
        }
      });
      this.dataToDisplay = this.responseData;
    })
  }

  getDataForProfessor() {
    this.dataToDisplay = []
    this.qaService.getAllQuestions().subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      this.dataToDisplay = this.responseData;
    })
  }

  getDataForEdit() {
    this.dataToDisplay = []
    this.qaService.getDataForEdit(this.userID).subscribe(x => {
      this.responseData = x;
      this.responseData = this.responseData.data;
      if (this.responseData.length === 0) {
        this.toastr.error("No Data Found!!!", "error")
      } else {
        this.dataToDisplay = this.responseData;
      }
    })
  }

  answer(id: string) {
    this.qaService.isQuestionForm = false;
    this.qaService.openInputDialog().afterClosed().subscribe(x => {
      if (x) {
        const ans = this.qaService.answer;
        const val = {
          questionID: id,
          professorID: this.userID,
          professorName: this.userName,
          answer: ans,
          isAnswered: true
        };
        this.qaService.submitAnswer(val).subscribe(x => {
          this.responseData = x;
          this.toastr.success(this.responseData.data, "Success");
          this.getDataForProfessor()
          this.getDataForEdit()
        })
      }
    })
  }

  triggerEditMyAnswerPage() {
    this.router.navigate(['q&a/my-answers'])
  }
}
