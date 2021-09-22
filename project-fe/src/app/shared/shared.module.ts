import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { InternalServerErrorComponent, PageNotFoundComponent, DialogComponent } from ".";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    InternalServerErrorComponent,
    PageNotFoundComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    InternalServerErrorComponent,
    PageNotFoundComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
