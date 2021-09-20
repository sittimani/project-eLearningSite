import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Answer, QAModel } from "src/app/core";
import { environment } from "src/environments/environment";
import { QaFormComponent } from "../../components/qa-form/qa-form.component";

@Injectable({
  providedIn: "root"
})
export class QaService {

  private serverAddress = environment.serverAddress;
  public isQuestionForm = true;
  public question = "";
  public answer = "";

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  public openInputDialog() {
    return this.dialog.open(QaFormComponent, {
      width: "390px",
      panelClass: "confirm-dialog-cotainer",
      disableClose: true
    })
  }

  public uploadQuestion(value: string): Observable<string> {
    return this.http.post<string>(this.serverAddress + "upload-question", JSON.parse(value));
  }

  public getMyquestions(id: String): Observable<QAModel[]> {
    return this.http.get<QAModel[]>(this.serverAddress + "my-questions/" + id);
  }

  public getAllQuestions(): Observable<QAModel[]> {
    return this.http.get<QAModel[]>(this.serverAddress + "all-questions");
  }

  public submitAnswer(value: Answer): Observable<string> {
    return this.http.put<string>(this.serverAddress + "answer", value);
  }

  public getDataForEdit(id: string): Observable<QAModel[]> {
    return this.http.get<QAModel[]>(this.serverAddress + "answered-question/" + id);
  }
}
