import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    component: TopicComponent
  }, {
    path: 'add/:name',
    component: TopicFormComponent
  }, {
    path: 'update/:name',
    component: TopicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicManagementRoutingModule { }
