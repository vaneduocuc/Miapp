import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CertificacionesComponent implements OnInit {

  // Variables requeridas por el encargo
  nombreCertificado: string = '';
  fechaObtencion: string = '';
  tieneVencimiento: boolean = false;
  fechaVencimiento: string = '';

  constructor() { }

  ngOnInit() {}

  guardarCertificado() {
    console.log('Guardando Certificación:', {
      nombre: this.nombreCertificado,
      obtencion: this.fechaObtencion,
      vence: this.tieneVencimiento,
      vencimiento: this.tieneVencimiento ? this.fechaVencimiento : null
    });
    // Aquí enlazaremos la persistencia clave/valor más adelante
  }
}