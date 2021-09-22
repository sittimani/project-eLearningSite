import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopicComponent, TopicFormComponent } from ".";
import { AuthGuard } from "../core";
import { LoginComponent, RegisterComponent } from "../user-management";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }, {
    path: "register",
    component: RegisterComponent
  }, {
    path: ":name",
    canActivate: [AuthGuard],
    component: TopicComponent
  }, {
    path: "add/:name",
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }, {
    path: "update/:name",
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicManagementRoutingModule { }
