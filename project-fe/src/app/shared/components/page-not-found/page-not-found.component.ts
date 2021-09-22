import { Component } from "@angular/core";
import { AuthService } from "src/app/user-management";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.css"]
})
export class PageNotFoundComponent {

  constructor(private auth:AuthService) {
    this.auth.loggedIn();
  }
}
