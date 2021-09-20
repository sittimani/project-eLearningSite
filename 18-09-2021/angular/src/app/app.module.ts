import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./user-management/shared/service/auth.service";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { InternalServerErrorComponent, PageNotFoundComponent, TokenInterceptor, DialogComponent } from "./core";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    PageNotFoundComponent,
    InternalServerErrorComponent
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
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
