import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
  // ❌ Quitamos el arreglo de providers de aquí adentro porque ya está en el AppModule
})
export class AppComponent {
  constructor() {}
}