import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
    // 💡 Quitamos a LoginPage de aquí para romper el conflicto circular
  ],
  declarations: [] // Se mantiene totalmente vacío
})
export class LoginPageModule {}

