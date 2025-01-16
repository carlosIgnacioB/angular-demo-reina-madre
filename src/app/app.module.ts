import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitaModuleComponent } from './cita-module/cita-module.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DialogCitaComponent } from './cita-module/dialog-cita.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CitaModuleComponent,
    NavBarComponent,
    DialogCitaComponent,
  ],
  imports: [
    HttpClientModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
