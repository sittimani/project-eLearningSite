import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './user-management/shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Final Project';
  open = false;

  homePage = true;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.subject.subscribe(x => {
      this.homePage = this.auth.roles.readDocument
    })
  }

  logout() {
    this.auth.logoutUser();
    this.router.navigate(['login'])
    this.homePage = false
  }
}
