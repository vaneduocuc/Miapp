import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';
import { ListaPage } from './lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule,
    
    // ✅ PASO 1: Movemos el componente aquí porque ahora es Standalone
    ListaPage 
  ],
  // ❌ PASO 2: Quitamos a ListaPage de las declaraciones
  declarations: [] 
})
export class ListaPageModule {}