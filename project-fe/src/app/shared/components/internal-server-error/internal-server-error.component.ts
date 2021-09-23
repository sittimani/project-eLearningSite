import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/user-management";

@Component({
  selector: "app-internal-server-error",
  templateUrl: "./internal-server-error.component.html",
  styleUrls: ["./internal-server-error.component.css"]
})
export class InternalServerErrorComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loggedIn();
  }
}
