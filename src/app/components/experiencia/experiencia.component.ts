import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ExperienciaComponent implements OnInit {

  // Variables para capturar los campos requeridos por la rúbrica
  empresa: string = '';
  anioInicio: number | null = null;
  trabajaAqui: boolean = false;
  anioTermino: number | null = null;
  cargo: string = '';

  constructor() { }

  ngOnInit() {}

  guardarExperiencia() {
    console.log('Guardando Experiencia:', {
      empresa: this.empresa,
      anioInicio: this.anioInicio,
      actualmente: this.trabajaAqui,
      anioTermino: this.trabajaAqui ? null : this.anioTermino,
      cargo: this.cargo
    });
    // Aquí enlazaremos la persistencia clave/valor más adelante
  }
}