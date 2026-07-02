import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Módulos de Angular Material que usabas en tu Home anterior
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class DatosComponent implements OnInit {

  usuario: any;

  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fecha: any = '';

  animarInputs: boolean = false;

  constructor(private router: Router) {
    // Recuperamos los datos del usuario que inició sesión
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras.state?.['data'];
  }

  ngOnInit() {
    console.log('Componente Mis Datos inicializado');
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fecha = '';

    this.animarInputs = false;
    setTimeout(() => {
      this.animarInputs = true;
    }, 50);
  }

  mostrar() {
    alert("Nombre: " + this.nombre + " " + this.apellido);
  }

}
