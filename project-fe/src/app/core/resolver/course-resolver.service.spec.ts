import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { CourseResolverService } from "./course-resolver.service";

describe("CourseResolverService", () => {
  let service: CourseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CourseResolverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
