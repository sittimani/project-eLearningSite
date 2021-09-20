import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { UserProfileService } from "./user-profile.service";

describe("UserProfileService", () => {
  let service: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(UserProfileService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
