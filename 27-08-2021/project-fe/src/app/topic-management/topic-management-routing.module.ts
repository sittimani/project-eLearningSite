import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user-management/components/login/login.component';
import { RegistrationComponent } from '../user-management/components/registration/registration.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  }, {
    path: 'register',
    component: RegistrationComponent
  }, {
    path:'home',
    component: CourseListComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'addtopic/:name',
    component: TopicFormComponent
  }, {
    path: 'update',
    component: TopicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicManagementRoutingModule { }
