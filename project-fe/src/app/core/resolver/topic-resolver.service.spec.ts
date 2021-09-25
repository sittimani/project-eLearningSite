import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { TopicService } from "src/app/topic-management";

import { TopicResolverService } from "./topic-resolver.service";

describe("TopicResolverService", () => {
  let service: TopicResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        TopicService
      ]
    });
    service = TestBed.inject(TopicResolverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
