import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopicComponent, TopicFormComponent } from ".";
import { AuthGuard } from "../core";
import { TopicResolverService } from "../core/resolver/topic-resolver.service";
import { LoginComponent } from "../user-management/components/login/login.component";
import { RegisterComponent } from "../user-management/components/register/register.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }, {
    path: "register",
    component: RegisterComponent
  }, {
    path: ":name",
    canActivate: [AuthGuard],
    resolve: {
      data: TopicResolverService
    },
    component: TopicComponent
  }, {
    path: "add/:name",
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }, {
    path: "update/:name",
    canActivate: [AuthGuard],
    component: TopicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicManagementRoutingModule { }
