import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { LoaderService } from "./shared/service/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements AfterViewChecked {

  public isLoading = false;

  constructor(
    public loader: LoaderService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.loader.isLoading.subscribe((isLoaderActive: boolean) => {
      this.isLoading = isLoaderActive;
    })
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
