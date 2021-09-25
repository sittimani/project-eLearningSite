import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material/material.module";
import { AuthService } from "src/app/user-management";
import { TopicService } from "../..";

import { TopicFormComponent } from "./topic-form.component";

describe("TopicFormComponent", () => {
  let component: TopicFormComponent;
  let fixture: ComponentFixture<TopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [TopicFormComponent],
      providers: [AuthService, TopicService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid form", () => {
    const value = {
      courseName: "test course",
      topicName: "test topic",
      documentLink: "test link"
    }
    component.topicForm.patchValue(value)
    fixture.detectChanges()
    expect(component.topicForm.valid).toBeFalse();
  })

  it("should be documentLink required error", () => {
    const value = {
      courseName: "test course",
      topicName: "test topic",
      documentLink: "",
      tutorialLink: "linknumber2"
    }
    component.topicForm.patchValue(value)
    fixture.detectChanges();
    const documentLinkControl = component.topicForm.get("documentLink");
    expect(documentLinkControl?.hasError("required")).toBeTrue();
  })

  it("should be documentLink min length error", () => {
    const value = {
      courseName: "test course",
      topicName: "test topic",
      documentLink: "test link",
      tutorialLink: "linknumber2"
    }
    component.topicForm.patchValue(value)
    fixture.detectChanges();
    const documentLinkControl = component.topicForm.get("documentLink");
    expect(documentLinkControl?.hasError("minlength")).toBeTrue();
  })

  it("should be valid form", () => {
    const value = {
      courseName: "test course",
      topicName: "test topic",
      documentLink: "test link1",
      tutorialLink: "linknumber2"
    }
    component.topicForm.patchValue(value)
    fixture.detectChanges()
    expect(component.topicForm.valid).toBeTrue();
  })

  it("should cancel button called", () => {
    spyOn(component, "cancel").and.callFake(() => {
      // eslint-disable-next-line no-console
      console.log("cancel called")
    })
    fixture.detectChanges();
    const cancelButton = fixture.debugElement.query(By.css(".cancel-button"));
    cancelButton.triggerEventHandler("click", null)
    expect(component.cancel).toHaveBeenCalled()
  })
});
