import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guard/auth.guard";
import { EditGuard } from "../core/guard/edit.guard";
import { QaDashboardComponent } from "./components/qa-dashboard/qa-dashboard.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: QaDashboardComponent
  }, {
    path: "my-answers",
    canActivate: [AuthGuard, EditGuard],
    component: QaDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionAndAnswerRoutingModule { }
