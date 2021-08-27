import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  dataForApproval = [
    {
      _id: "1234",
      name: "Manikandan",
      email: "mksitti@gmail.com",
      workingAt: "kn"
    }, {
      _id: "1235",
      name: "Manikandan",
      email: "mksitti@gmail.com",
      workingAt: "kn"
    }, {
      _id: "1236",
      name: "Manikandan",
      email: "mksitti@gmail.com",
      workingAt: "kn"
    }
  ]

  status: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  approve(id: string) {
    var notAvailable = true;
    this.status.forEach((element: any, index:any) => {
      if (element._id === id) {
        this.status[index].status = "approved"
        notAvailable = false;
      }
    });
    if (notAvailable) {
      const value = {
        _id: id,
        status: "approved"
      }
      this.status.push(value)
    }
  }

  deny(id: string) {
    var notAvailable = true;
    this.status.forEach((element: any, index:number) => {
      if (element._id === id) {
        this.status[index].status = "denied"
        notAvailable = false;
      }
    });
    if (notAvailable) {
      const value = {
        _id: id,
        status: "denied"
      }
      this.status.push(value)
    }
  }

  submitAllActions() {
    console.log(this.status)
  }

}
