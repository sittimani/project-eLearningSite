import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './topic-management/components/course-list/course-list.component';
import { CourseComponent } from './topic-management/components/course/course.component';
import { LoginComponent } from './user-management/components/login/login.component';
import { RegistrationComponent } from './user-management/components/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: CourseListComponent
  }, {
    path: 'register',
    component: RegistrationComponent
  }, {
    path: 'login',
    component: LoginComponent
  },{
    path: 'course',
    component: CourseComponent
  },{
    path: 'updateprofile',
    component: RegistrationComponent
  }, {
    path: 'topic',
    loadChildren: () => import('./topic-management/topic-management.module').then(m => m.TopicManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
