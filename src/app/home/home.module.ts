import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { DatosComponent } from '../components/datos/datos.component';
import { ExperienciaComponent } from '../components/experiencia/experiencia.component';
import { CertificacionesComponent } from '../components/certificaciones/certificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HomePage,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    DatosComponent,
    ExperienciaComponent,
    CertificacionesComponent 
  ],
  
  declarations: [] 
})
export class HomePageModule {}