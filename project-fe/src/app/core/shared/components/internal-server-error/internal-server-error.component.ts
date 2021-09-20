import { Component } from "@angular/core";
import { AuthService } from "src/app/user-management";

@Component({
  selector: "app-internal-server-error",
  templateUrl: "./internal-server-error.component.html",
  styleUrls: ["./internal-server-error.component.css"]
})
export class InternalServerErrorComponent {

  constructor(private auth: AuthService) {
    this.auth.loggedIn()
  }
}
