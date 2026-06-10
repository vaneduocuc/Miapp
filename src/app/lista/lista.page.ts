import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true, // ✅ Activamos Standalone
  imports: [
    CommonModule, // 🔥 Necesario para usar directivas como *ngFor en la lista de estudiantes
    FormsModule,
    IonicModule
  ]
})
export class ListaPage {

  estudiantes = [
    // 📅 Agregamos la propiedad 'fechaNacimiento' a cada estudiante
    { nombre: 'Gracia', apellido: 'Ortiz', Carrera: 'Ingeniería en Informática', fechaNacimiento: '12/03/2002' },
    { nombre: 'María', apellido: 'González', Carrera: 'Medicina', fechaNacimiento: '25/07/2001' },
    { nombre: 'Pedro', apellido: 'Rojas', Carrera: 'Derecho', fechaNacimiento: '09/11/2000' }
  ];

}