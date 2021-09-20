import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/material/material.module";

import { QaService } from "./qa.service";

describe("QaService", () => {
  let service: QaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(QaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
