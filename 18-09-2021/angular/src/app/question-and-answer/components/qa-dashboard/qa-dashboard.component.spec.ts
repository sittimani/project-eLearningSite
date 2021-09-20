import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { AppModule } from "src/app/app.module";
import { MaterialModule } from "src/app/material/material.module";
import { AuthService } from "src/app/user-management";

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
        { provide: AuthService, useValue:  serviceSpy  }
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
});
