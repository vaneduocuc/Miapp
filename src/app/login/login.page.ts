import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  user = {
    usuario: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  ingresar() {

    // Validación usuario
    if (this.user.usuario.length < 3 || this.user.usuario.length > 8) {
      alert("El usuario debe tener entre 3 y 8 caracteres");
      return;
    }

    // Validación contraseña
    if (!/^[0-9]{4}$/.test(this.user.password)) {
      alert("La contraseña debe tener 4 números");
      return;
    }

    // Navegar a Home con datos
    this.router.navigate(['/home'], {
      state: { data: this.user }
    });

  }

}