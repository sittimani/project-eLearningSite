import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material/material.module";
import { AuthService } from "../..";

import { PasswordComponent } from "./password.component";

describe("PasswordComponent", () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj("AuthService", ["getUserDetails"])
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [PasswordComponent],
      providers: [{ provide: AuthService, useValue: serviceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invalid form", () => {
    const data = {
      password: "123",
      oldPassword: "12345678",
      newPassword: "123456789"
    }
    component.passwordForm.patchValue(data);
    fixture.detectChanges();
    expect(component.passwordForm.invalid).toBeTrue();
  })

  it("should valid form", () => {
    const data = {
      password: "123567890",
      oldPassword: "123456789",
      newPassword: "123456789"
    }
    component.passwordForm.patchValue(data);
    fixture.detectChanges();
    expect(component.passwordForm.invalid).toBeTrue();
  })

  it("should mimatch", () => {
    const data = {
      password: "123567890",
      oldPassword: "123456789",
      newPassword: "1234567890"
    }
    component.passwordForm.patchValue(data);
    fixture.detectChanges();
    expect(component.passwordForm.hasError("misMatch")).toBeFalse();
  })

});
