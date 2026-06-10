import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';
import { InfoPage } from './info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    
    // ✅ PASO 1: Movemos el componente aquí porque ahora es Standalone
    InfoPage 
  ],
  // ❌ PASO 2: Quitamos a InfoPage de las declaraciones
  declarations: [] 
})
export class InfoPageModule {}
