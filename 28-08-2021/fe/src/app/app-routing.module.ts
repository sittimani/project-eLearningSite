import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { CourseFormComponent } from './course-management/components/course-form/course-form.component';
import { CourseListComponent } from './topic-management/components/course-list/course-list.component';
import { CourseComponent } from './topic-management/components/course/course.component';
import { LoginComponent } from './user-management/components/login/login.component';
import { PasswordComponent } from './user-management/components/password/password.component';
import { RegistrationComponent } from './user-management/components/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'home',
    canActivate: [AuthGuard],
    component: CourseListComponent
  }, {
    path: 'register',
    component: RegistrationComponent
  }, {
    path: 'login',
    component: LoginComponent
  },{
    path: 'course/:name',
    canActivate: [AuthGuard],
    component: CourseComponent
  },{
    path: 'updateProfile/:id',
    canActivate: [AuthGuard] ,
    component: RegistrationComponent
  }, {
    path: 'resetpassword',
    component: PasswordComponent
  }, {
    path: 'topic',
    loadChildren: () => import('./topic-management/topic-management.module').then(m => m.TopicManagementModule)
  }, {
    path: 'admin',
    loadChildren: () => import('./course-management/course-management.module').then(m => m.CourseManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
