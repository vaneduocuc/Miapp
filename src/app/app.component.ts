import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 🔥 Importamos el módulo de Ionic
import { CommonModule } from '@angular/common'; // 🔥 Buenas prácticas para standalone

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // ✅ Ya estaba marcado como standalone
  imports: [
    CommonModule,
    IonicModule // 🚀 ¡ESTO FALTA! Permite que el HTML entienda <ion-app> y <ion-router-outlet>
  ] 
})
export class AppComponent {
  constructor() {}
}