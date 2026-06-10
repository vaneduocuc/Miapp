import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

// 🔥 ANGULAR MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

    // 🔥 IMPORTANTE: MATERIAL AQUÍ
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    
    // ✅ PASO 1: Agregamos el componente aquí porque ahora es Standalone
    HomePage 
  ],
  // ❌ PASO 2: Quitamos a HomePage de las declaraciones
  declarations: [] 
})
export class HomePageModule {}