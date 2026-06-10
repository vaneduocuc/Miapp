import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class RegistroPage {

  nombre: string = '';
  apellido: string = '';
  Carrera: string = ''; // ✅ CAMBIADO: De 'nivel' a 'Carrera' (con C mayúscula) para que coincida con el HTML
  fecha: any = '';

  guardar() {
    // ✅ Actualizado también en el alert para que use la variable correcta
    alert('Estudiante guardado: ' + this.nombre + ' ' + this.apellido + ' de ' + this.Carrera);
  }

}
