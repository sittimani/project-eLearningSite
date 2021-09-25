import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material/material.module";

import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid form", () => {
    expect(component.registrationForm.valid).toBeFalse();
  })

  it("should be valid form", () => {
    const data = {
      name: "mani",
      age: 21,
      gender: "male",
      phone: "1234567890",
      email: "manikandansitti@gmail.com",
      password: "123456789765",
      confirmPassword: "123456789765",
      workingAt: "Aspire"
    }
    component.registrationForm.patchValue(data);
    fixture.detectChanges();
    expect(component.registrationForm.valid).toBeTrue()
  })

  it("should disable fields", () => {
    component.disableFieldForUpdate();
    fixture.detectChanges();
    expect(component.registrationForm.get("password")?.disabled).toBeTrue()
  })
});
