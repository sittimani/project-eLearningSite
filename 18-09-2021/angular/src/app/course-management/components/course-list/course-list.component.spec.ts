import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { Observable } from "rxjs";
import { Topic } from "src/app/core";
import { MaterialModule } from "src/app/material/material.module";
import { AuthService } from "src/app/user-management";
import { CourseService } from "../..";

import { CourseListComponent } from "./course-list.component";

describe("CourseListComponent", () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj("AuthService", ["getUserDetails"])
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [CourseListComponent],
      providers: [
        { provide: AuthService, useValue: serviceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should isNoCourse is true", () => {
    component.isNoCourse = true;
    fixture.detectChanges()
    expect(component.isNoCourse).toBeTruthy();
  });

  it("should retrieve all data", () => {

    const data = [
      {
        _id: "613f00e84c61b001e44c2465",
        courseName: "django",
        overview: {
          shortDescription: "Django is a web application framework.",
          url: "1631518952076.png",
          description: "Django is a high-level Python web framework that enables rapid development of secure and maintainable websites.\nBuilt by experienced developers, Django takes care of much of the hassle of web development, \nso you can focus on writing your app without needing to reinvent the wheel. It is free and open source, \nhas a thriving and active community, great documentation, and many options for free and paid-for support. "
        },
        createdAt: "",
        updatedAt: ""
      }
    ];
    let service = fixture.debugElement.injector.get(CourseService)
    spyOn(service, "getAllCourse").and.callFake(() => {
      return new Observable<Topic[]>(Subscriber => {
        Subscriber.next(data)
      })
    })

    const someData = {
      id: "613f00e84c61b001e44c2465",
      name: "django",
      shortDescription: "Django is a web application framework.",
      url: "http://localhost:8080/uploads/" + "1631518952076.png"
    }
    component.getCourses();
    fixture.detectChanges()
    expect(component.allCourse[0]).toEqual(someData)
  })
});
