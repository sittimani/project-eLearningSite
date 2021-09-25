import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material/material.module";
import { UserInformation, userAuth } from "src/app/user-management";

import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return format value", () => {
    const temp: UserInformation = {
      name: "mani",
      workingAt: "kongunade",
      age: 0,
      gender: "",
      phone: 0
    }
    const element: userAuth = {
      email: "mkd@gmail.com",
      _id: "1231231",
      emailVerified: false,
      password: "",
      role: "",
      verified: ""
    }
    const result = {
      name: "mani",
      workingAt: "kongunade",
      email: "mkd@gmail.com",
      _id: "1231231"
    }
    expect(component.formatDataToDisplay(temp, element)).toEqual(result)
  })

  it("should call approve method", () => {
    component.isNoUser = false;
    component.dataForApproval = [{
      name: "mani",
      email: "manikandansitti@gmail.com",
      workingAt: "somewhere",
      _id: "11"
    }]
    spyOn(component, "approve").and.callFake(() => {
      // eslint-disable-next-line no-console
      console.log("called")
    });
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css(".test-class"))[0];
    button.triggerEventHandler("click", null)
    expect(component.approve).toHaveBeenCalled();
  });
});
