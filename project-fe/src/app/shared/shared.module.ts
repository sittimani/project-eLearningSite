import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { InternalServerErrorComponent, PageNotFoundComponent, DialogComponent } from ".";

@NgModule({
  declarations: [
    InternalServerErrorComponent,
    PageNotFoundComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    InternalServerErrorComponent,
    PageNotFoundComponent,
    DialogComponent
  ]
})
export class SharedModule { }
