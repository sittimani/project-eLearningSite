import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent, CourseFormComponent } from ".";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    redirectTo: "/admin/dashboard",
    pathMatch: "full"
  }, {
    path: "add",
    canActivate: [AuthGuard],
    component: CourseFormComponent
  }, {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
