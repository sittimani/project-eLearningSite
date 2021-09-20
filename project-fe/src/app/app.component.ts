import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserErrors } from "./core";
import { QaService } from "./question-and-answer";
import { LoaderService } from "./shared/service/loader.service";
import { AuthService, Menu, Roles, UserDetails } from "./user-management";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewChecked {

  public title = "iLearn";
  public isOpen = false;
  public isLoggedIn = false;
  public userName!: string;
  public userId!: string;
  public roles: Roles = {
    createCourse: false,
    createDocument: false,
    readDocument: false,
    updateDocument: false
  };
  public isLoading = false;
  public menu:Menu[] = []

  constructor(
    private auth: AuthService,
    private router: Router,
    public loader: LoaderService,
    private qaService: QaService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.loader.isLoading.subscribe((x: boolean) => {
      this.isLoading = x;
    })
  }

  ngOnInit(): void {
    this.auth.behSubject$.subscribe(x => {
      this.isLoggedIn = false;
      this.menu = []
      if (x) {
        const userDetails: UserDetails = this.auth.getUserDetails();
        this.isLoggedIn = true;
        this.userName = userDetails.name;
        this.userId = userDetails._id;
        this.roles = userDetails.role;
        this.loadMenu();
      }
    })
  }

  private loadMenu() {
    const menuItems = localStorage.getItem("menu");
    if(menuItems)
      this.menu = JSON.parse(menuItems)
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges()
  }

  public get isStudent() {
    return this.roles.readDocument === true && this.roles.createCourse === false && this.roles.updateDocument === false
  }

  public updateProfile(): void {
    this.router.navigate(["update-profile/" + this.userId]);
  }

  public takeQuestion(): void {
    this.qaService.openInputDialog().afterClosed().subscribe((x: boolean) => {
      if (x) {
        const value = {
          studentID: this.userId,
          studentName: this.userName,
          question: this.qaService.question,
          isAnswered: false
        }
        if (this.qaService.question !== "") {
          this.qaService.uploadQuestion(JSON.stringify(value)).subscribe((response: string) => {
            this.toastr.success(response, "Success");
          })
        } else {
          this.toastr.error(UserErrors.InvalidForm, "Error")
        }
      }
    })
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(["login"]);
    this.roles.createCourse = false;
  }

}
