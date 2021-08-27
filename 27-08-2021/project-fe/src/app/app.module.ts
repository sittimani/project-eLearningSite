import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthService } from './user-management/shared/service/auth.service';
import { UserManagementModule } from './user-management/user-management.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorService } from './core/interceptor/tokeninterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserManagementModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, {
    provide:HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
