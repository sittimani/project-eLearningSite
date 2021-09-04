import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './core/shared/components/dialog/dialog.component';
import { AuthService } from './user-management/shared/service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorInterceptor } from './core/interceptor/tokeninterceptor.interceptor';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from "@angular/common/http";
import { PagenotfoundComponent } from './core/shared/components/pagenotfound/pagenotfound.component'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
