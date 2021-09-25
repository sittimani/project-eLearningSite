import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QaDashboardComponent } from ".";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    redirectTo: "/discussion/qa-dashboard",
    pathMatch: "full"
  }, {
    path: "qa-dashboard",
    canActivate: [AuthGuard],
    component: QaDashboardComponent
  }, {
    path: "my-answers",
    canActivate: [AuthGuard],
    component: QaDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionAndAnswerRoutingModule { }
