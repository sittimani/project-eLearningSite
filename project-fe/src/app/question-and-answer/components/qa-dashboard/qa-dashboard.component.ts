import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "src/app/core";
import { AuthService, Roles } from "src/app/user-management";
import { Answer, QAModel, QaService } from "../..";
import { UserDetails } from "src/app/user-management";

@Component({
  selector: "app-qa-dashboard",
  templateUrl: "./qa-dashboard.component.html",
  styleUrls: ["./qa-dashboard.component.css"]
})
export class QaDashboardComponent implements OnInit {

  public dataToDisplay: QAModel[] = [];
  public isStudent = true;
  private userID!: string;
  private userName!: string;
  public isAnswerEditPage = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private qaService: QaService
  ) { }

  ngOnInit(): void {
    const userDetails: UserDetails = this.auth.getUserDetails();
    if (userDetails) {
      this.userID = userDetails._id;
      this.userName = userDetails.name;
      this.loadPage(userDetails);
    }
  }
  private loadPage(userDetails: UserDetails): void {
    if (this.router.url.includes("my-answers")) {
      this.isAnswerEditPage = true;
      this.getDataForEdit();
    } else
      this.checkUser(userDetails.role);
  }

  private checkUser(role: Roles): void {
    if (role.readDocument && !role.createCourse && !role.updateDocument) {
      this.isStudent = true;
      this.getDataForStudent();
    } else {
      this.isStudent = false;
      this.getDataForProfessor();
    }
  }

  private getDataForStudent(): void {
    this.qaService.getMyquestions(this.userID).subscribe((response: QAModel[]) => {
      if (response.length !== 0)
        this.dataToDisplay = response.map(this.fillAnswer);
      else
        this.toastr.error(UserErrors.NoDataFound, "Error");
    })
  }

  private fillAnswer(element: QAModel) {
    if (!element.isAnswered) {
      element.answer = "Yet to be answered";
      element.professorName = "Nil";
    }
    return element;
  }


  private getDataForProfessor(): void {
    this.dataToDisplay = []
    this.qaService.getAllQuestions().subscribe((response: QAModel[]) => {
      if (response.length !== 0)
        this.dataToDisplay = response;
      else
        this.toastr.error(UserErrors.NoDataFound, "Error");
    });
  }

  private getDataForEdit(): void {
    this.dataToDisplay = []
    this.qaService.getDataForEdit(this.userID).subscribe((response: QAModel[]) => {
      const data = response;
      const count: number = data.length;
      count !== 0 ? this.dataToDisplay = data : this.toastr.error(UserErrors.NoDataFound, "error");
    })
  }

  public answer(id: string): void {
    this.qaService.isQuestionForm = false;
    this.qaService.openInputDialog().afterClosed().subscribe((isClosed: boolean) => {
      if (isClosed) {
        const answer = this.qaService.answer;
        const value: Answer = {
          questionID: id,
          professorID: this.userID,
          professorName: this.userName,
          answer: answer,
          isAnswered: true
        };
        answer !== "" ? this.submitAnswer(value) : this.toastr.error(UserErrors.InvalidForm, "Error");
      }
    })
  }

  private submitAnswer(val: Answer): void {
    this.qaService.submitAnswer(val).subscribe((response: string) => {
      this.toastr.success(response, "Success");
      this.router.url.includes("my-answers") ? this.getDataForEdit() : this.getDataForProfessor();
    })
  }

  public triggerEditMyAnswerPage(): void {
    this.router.navigate(["discussion/my-answers"]);
  }
}
