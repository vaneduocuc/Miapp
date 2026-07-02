import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 

// 👇 Importamos los culpables del bloqueo aquí mismo
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false, 
 
  // 🚀 ¡ESTO ES LO QUE VA A QUITAR LA PANTALLA BLANCA!
  providers: [
    SQLite,
    NativeStorage
  ]
})
export class AppComponent {
  constructor() {}
}