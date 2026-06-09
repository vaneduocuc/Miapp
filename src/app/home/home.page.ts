import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  usuario: any;

  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fecha: any = '';

  // 🔥 NUEVO: control de animación
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

    // 🔥 activar animación al limpiar
    this.animarInputs = false;
    setTimeout(() => {
      this.animarInputs = true;
    }, 50);
  }

  mostrar() {
    alert("Nombre: " + this.nombre + " " + this.apellido);
  }

}
