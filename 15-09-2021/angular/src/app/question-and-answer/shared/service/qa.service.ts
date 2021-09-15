import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { QaFormComponent } from '../../components/qa-form/qa-form.component';

@Injectable({
  providedIn: 'root'
})
export class QaService {

  private serverAddress = environment.serverAddress
  isQuestionForm = true;
  question = '';
  answer = ''
  constructor(
    private dialog: MatDialog,
    private http: HttpClient) { }

  openInputDialog() {
    return this.dialog.open(QaFormComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-cotainer',
      disableClose: true
    })
  }

  uploadQuestion(value: any) {
    return this.http.post(this.serverAddress + 'upload-question', value)
  }

  getMyquestions(id: String){
    return this.http.get(this.serverAddress + 'my-questions/'+ id)
  }

  getAllQuestions(){
    return this.http.get(this.serverAddress + "all-questions")
  }

  submitAnswer(value: any){
    return this.http.put(this.serverAddress + "answer", value)
  }

  getDataForEdit(id: string){
    return this.http.get(this.serverAddress + 'answered-question/' + id)
  }
}
