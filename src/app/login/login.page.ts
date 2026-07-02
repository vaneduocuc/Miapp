import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DbtaskService } from '../services/dbtask'; // 👈 Importamos tu servicio de persistencia

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class LoginPage implements OnInit {

  // Mantenemos tu mismo objeto enlazado al HTML con [(ngModel)]
  user = {
    usuario: '',
    password: ''
  };

  constructor(
    private router: Router,
    private dbTask: DbtaskService // 👈 Inyectamos el servicio en el constructor
  ) {}

  ngOnInit() {}

  async ingresar() {
    // 1. Validación de longitud del nombre de usuario
    if (this.user.usuario.length < 3 || this.user.usuario.length > 8) {
      this.dbTask.presentToast("El usuario debe tener entre 3 y 8 caracteres");
      return;
    }

    // 2. Validación de contraseña (debe ser de 4 dígitos numéricos)
    if (!/^[0-9]{4}$/.test(this.user.password)) {
      this.dbTask.presentToast("La contraseña debe tener exactamente 4 números");
      return;
    }

    // Convertimos la contraseña a número entero para la base de datos SQLite
    const passAsNumber = parseInt(this.user.password, 10);
    
    try {
      // 3. Validamos si las credenciales existen en la tabla SQLite sesion_data
      const existeUsuario = await this.dbTask.validarUsuario(this.user.usuario, passAsNumber);

      if (existeUsuario) {
        // 4. Activamos la sesión en SQLite y escribimos las llaves en Ionic Storage
        await this.dbTask.registrarUsuario(this.user.usuario, passAsNumber);
        
        this.dbTask.presentToast(`¡Bienvenido/a ${this.user.usuario}!`);

        // 5. Navegamos de forma optimizada al Home enviando el estado requerido
        this.router.navigate(['/home'], {
          state: { data: this.user }
        });
      } else {
        this.dbTask.presentToast("Usuario o contraseña incorrectos. ¿Ya te registraste?");
      }
    } catch (error) {
      this.dbTask.presentToast("Error al conectar con la base de datos nativa");
      console.error(error);
    }
  }
}