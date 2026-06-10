import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    
    // ✅ PASO 1: Movemos el componente aquí porque ahora es Standalone
    RegistroPage 
  ],
  // ❌ PASO 2: Quitamos a RegistroPage de las declaraciones
  declarations: [] 
})
export class RegistroPageModule {}