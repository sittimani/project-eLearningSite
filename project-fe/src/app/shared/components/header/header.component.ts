import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "src/app/core";
import { QaService } from "src/app/question-and-answer";
import { AuthService, Menu, Roles, UserDetails } from "src/app/user-management";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  public title = "iLearn";
  public isOpen = false;
  public isLoggedIn = false;
  public userName!: string;
  public userId!: string;
  public roles!: Roles;
  public isLoading = false;
  public menu: Menu[] = [];

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private qaService: QaService
  ) { }

  ngOnInit(): void {
    this.auth.userLoggedIn$.subscribe((isUserLoggedIn: boolean) => {
      this.isLoggedIn = isUserLoggedIn;
      this.menu = [];
      if (isUserLoggedIn) {
        const userDetails: UserDetails = this.auth.getUserDetails();
        this.userName = userDetails.name;
        this.userId = userDetails._id;
        this.roles = userDetails.role;
        this.loadMenu();
      }
    })
  }
  private loadMenu() {
    const menuItems = localStorage.getItem("menu");
    if (menuItems)
      this.menu = JSON.parse(menuItems);
  }

  public get isStudent() {
    return this.roles.readDocument === true &&
      this.roles.createCourse === false &&
      this.roles.updateDocument === false;
  }

  public updateProfile(): void {
    this.router.navigate(["update-profile/" + this.userId]);
  }

  public takeQuestion(): void {
    this.qaService.openInputDialog().afterClosed().subscribe((choice: boolean) => {
      if (choice) {
        const value = {
          studentID: this.userId,
          studentName: this.userName,
          question: this.qaService.question,
          isAnswered: false
        };
        this.saveQuestion(JSON.stringify(value));
      }
    })
  }

  private saveQuestion(value: string) {
    if (this.qaService.question !== "") {
      this.qaService.uploadQuestion(value).subscribe((response: string) => {
        this.toastr.success(response, "Success");
      })
    } else {
      this.toastr.error(UserErrors.InvalidForm, "Error");
    }
  }

  public logout() {
    this.auth.logOut();
    this.router.navigate(["login"]);
    this.roles.createCourse = false;
  }

  public closeSideNav() {
    this.isOpen = !this.isOpen;
  }

}
