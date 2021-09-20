import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CourseFormComponent } from "./components/course-form/course-form.component";
import { CreateGuard } from "../core/guard/create.guard";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/admin/dashboard",
    pathMatch: "full"
  }, {
    path: "dashboard",
    canActivate: [AuthGuard, CreateGuard],
    component: DashboardComponent
  }, {
    path: "add",
    canActivate: [AuthGuard, CreateGuard],
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
