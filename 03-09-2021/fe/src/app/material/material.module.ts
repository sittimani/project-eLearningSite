import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule} from "@angular/material/dialog"
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table"

const materials = [
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatRadioModule,
  FlexLayoutModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule
]

@NgModule({
  declarations: [ ],
  imports: [ 
    materials
  ],
  exports: [ materials ]
})
export class MaterialModule { }
