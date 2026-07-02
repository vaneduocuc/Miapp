import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [

  // 🔥 REDIRECCIÓN INICIAL
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // LOGIN
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  // HOME (Protegido por el escudo del Guard)
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // 👈 2. Activamos la restricción de acceso aquí 🔒
  },

  // REGISTRO
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },

  // LISTA
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then(m => m.ListaPageModule)
  },

  // INFO
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoPageModule)
  },

  // AGREGAR
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarPageModule)
  },

  // MODIFICAR
  {
    path: 'modificar',
    loadChildren: () => import('./pages/modificar/modificar.module').then(m => m.ModificarPageModule)
  },

  // 🛑 MANEJO DE ERROR 404 (Ruta no encontrada)
  {
    path: '**', // 👈 3. Captura absolutamente cualquier URL inválida
    loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
