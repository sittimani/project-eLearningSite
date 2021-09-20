import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseFormComponent, DashboardComponent } from ".";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    redirectTo: "/admin/dashboard",
    pathMatch: "full"
  }, {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent
  }, {
    path: "add",
    canActivate: [AuthGuard],
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
