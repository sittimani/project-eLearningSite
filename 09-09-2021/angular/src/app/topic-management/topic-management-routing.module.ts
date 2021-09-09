import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { LoginComponent } from '../user-management/components/login/login.component';
import { RegisterComponent } from '../user-management/components/register/register.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicComponent } from './components/topic/topic.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: ':name',
    canActivate: [AuthGuard],
    component: TopicComponent
  }, {
    path: 'add/:name',
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }, {
    path: 'update/:name',
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicManagementRoutingModule { }
