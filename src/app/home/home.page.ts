import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 👈 1. IMPORTANTE: Agregamos RouterModule aquí
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule, // 👈 2. ¡AQUÍ ESTÁ LA MAGIA! Habilita los 'routerLink' en el HTML
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class HomePage {

  usuario: any;

  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fecha: any = '';

  // control de animación
  animarInputs: boolean = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras.state?.['data'];
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fecha = '';

    // activar animación al limpiar
    this.animarInputs = false;
    setTimeout(() => {
      this.animarInputs = true;
    }, 50);
  }

  mostrar() {
    alert("Nombre: " + this.nombre + " " + this.apellido);
  }

}
