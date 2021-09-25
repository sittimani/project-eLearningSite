import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { AppModule } from "src/app/app.module";
import { MaterialModule } from "src/app/material/material.module";
import { AuthService } from "src/app/user-management";
import { QAModel } from "../..";

import { QaDashboardComponent } from "./qa-dashboard.component";

describe("QaDashboardComponent", () => {
  let component: QaDashboardComponent;
  let fixture: ComponentFixture<QaDashboardComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj("AuthService", ["getUserDetails"])
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      declarations: [QaDashboardComponent],
      providers: [
        { provide: AuthService, useValue: serviceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call triggerEditMyAnswerPage function", () => {
    component.isStudent = false;
    spyOn(component, "triggerEditMyAnswerPage").and.callFake(() => {
      // eslint-disable-next-line no-console
      console.log("triggerEditMyAnswerPage called")
    })
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css("button"));
    buttonElement.triggerEventHandler("click", null)
    expect(component.triggerEditMyAnswerPage).toHaveBeenCalled();
  })

  it("should fill answer and professor property", () => {
    const data: QAModel = {
      _id: "",
      studentID: "123",
      studentName: "MANI",
      question: "hi, how are you?",
      answer: "",
      isAnswered: false,
      professorID: "",
      professorName: ""
    }
    const returnData: QAModel = {
      _id: "",
      studentID: "123",
      studentName: "MANI",
      question: "hi, how are you?",
      answer: "Yet to be answered",
      isAnswered: false,
      professorID: "",
      professorName: "Nil"
    }
    expect(component.fillAnswer(data)).toEqual(returnData);
  })

  it("should return the same object", () => {
    const data: QAModel = {
      _id: "",
      studentID: "123",
      studentName: "MANI",
      question: "hi, how are you?",
      answer: "",
      isAnswered: true,
      professorID: "",
      professorName: ""
    };
    expect(component.fillAnswer(data)).toEqual(data)
  })

});
