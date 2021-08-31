import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from '../user-management/components/login/login.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'add',
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
