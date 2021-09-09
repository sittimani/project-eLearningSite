import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user-management';

@Component({
  selector: 'app-internalserverproblem',
  templateUrl: './internalserverproblem.component.html',
  styleUrls: ['./internalserverproblem.component.css']
})
export class InternalserverproblemComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.auth.loggedIn()
  }

  ngOnInit(): void {
  }

}
