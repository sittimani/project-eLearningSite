import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core";
import { CourseListComponent } from "./course-management";
import { InternalServerErrorComponent, PageNotFoundComponent } from "./shared";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./user-management/user-management.module").then(m => m.UserManagementModule)
  }, {
    path: "home",
    canActivate: [AuthGuard],
    component: CourseListComponent
  }, {
    path: "topic",
    loadChildren: () => import("./topic-management/topic-management.module").then(m => m.TopicManagementModule)
  }, {
    path: "admin",
    loadChildren: () => import("./course-management/course-management.module").then(m => m.CourseManagementModule)
  }, {
    path: "q&a",
    loadChildren: () => import("./question-and-answer/question-and-answer.module").then(m => m.QuestionAndAnswerModule)
  }, {
    path: "internalserverproblem",
    component: InternalServerErrorComponent
  }, {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
