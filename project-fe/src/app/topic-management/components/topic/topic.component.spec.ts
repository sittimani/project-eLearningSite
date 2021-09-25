import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material/material.module";
import { Topic } from "../..";
import { TopicComponent } from "./topic.component";

describe("TopicComponent", () => {
  let component: TopicComponent;
  let fixture: ComponentFixture<TopicComponent>;
  let data:Topic;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      declarations: [TopicComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    data = {
      _id: "abc",
      overview: {
        shortDescription: "",
        url: "",
        description: "Test Description"
      },
      courseName: "Test case",
      components: {
        documentLink: "123",
        tutorialLink: "123"
      },
      components1: {
        documentLink: "123",
        tutorialLink: "123"
      },
      components2: {
        documentLink: "123",
        tutorialLink: "123"
      }
    }
    fixture = TestBed.createComponent(TopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("is detect all the keys to display", () => {
    const keys = ["components", "components1", "components2"]
    component.reStructureData(data);
    fixture.detectChanges();
    expect(component.keysDisplayed).toEqual(keys)
  })


  it("should return false", () => {
    expect(component.skipKey("id")).toBe(false);
  })

});

