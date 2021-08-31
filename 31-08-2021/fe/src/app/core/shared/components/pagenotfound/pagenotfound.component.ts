import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user-management/shared/service/auth.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private auth: AuthService) { 
    this.auth.loggedIn()
  }

  ngOnInit(): void {
  }

}
