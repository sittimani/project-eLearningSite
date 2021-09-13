import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';
import { InternalserverproblemComponent } from './core/shared/components/internalserverproblem/internalserverproblem.component';
import { PagenotfoundComponent } from './core/shared/components/pagenotfound/pagenotfound.component';
import { CourseListComponent } from './course-management/components/course-list/course-list.component';
import { LoginComponent } from './user-management/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  }, {
    canActivate: [AuthGuard],
    path: 'home',
    component: CourseListComponent
  }, {
    path: 'topic',
    loadChildren: () => import("./topic-management/topic-management.module").then(m => m.TopicManagementModule)
  }, {
    path: 'admin',
    loadChildren: () => import('./course-management/course-management.module').then(m => m.CourseManagementModule)
  }, {
    path: 'q&a',
    loadChildren: () => import('./question-and-answer/question-and-answer.module').then(m => m.QuestionAndAnswerModule)
  }, {
    path: 'internalserverproblem',
    component: InternalserverproblemComponent
  }, {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
