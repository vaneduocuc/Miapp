import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbtaskService } from '../services/dbtask'; // 👈 Importamos tu servicio nativo

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
  Carrera: string = ''; 
  fecha: any = '';

  constructor(
    private dbTask: DbtaskService, // 👈 Inyectamos la persistencia en el constructor
    private router: Router
  ) {}

  async guardar() {
    // 1. Validaciones básicas antes de persistir
    if (this.nombre.trim() === '' || this.apellido.trim() === '') {
      this.dbTask.presentToast('Por favor, rellena los datos del estudiante');
      return;
    }

    if (this.nombre.length < 3 || this.nombre.length > 8) {
      this.dbTask.presentToast('El nombre de usuario para el inicio de sesión debe tener entre 3 y 8 caracteres');
      return;
    }

    // Generamos una contraseña numérica de 4 dígitos por defecto (ej: 1234) requerida por el modelo de datos
    const passwordRequerido = 1234;

    try {
      // 2. Ejecutamos las operaciones en SQLite e Ionic Storage según la rúbrica
      // Guarda en la tabla sesion_data (user_name, password, active = 1) y setea las llaves clave/valor
      await this.dbTask.registrarUsuario(this.nombre, passwordRequerido);
      
      this.dbTask.presentToast('Estudiante guardado y sesión inicializada en SQLite');

      // 3. Redirección optimizada enviando el estado al componente MisDatos
      this.router.navigate(['/home'], {
        state: { 
          data: { 
            usuario: this.nombre,
            nombre: this.nombre,
            apellido: this.apellido,
            nivel: this.Carrera // Mapeamos Carrera al nivel que espera recibir la vista
          } 
        }
      });
      
    } catch (error) {
      this.dbTask.presentToast('Error al escribir en la memoria interna del equipo');
      console.error(error);
    }
  }

}
