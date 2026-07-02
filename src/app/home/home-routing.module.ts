import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DatosComponent } from '../components/datos/datos.component';
import { ExperienciaComponent } from '../components/experiencia/experiencia.component';
import { CertificacionesComponent } from '../components/certificaciones/certificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'perfil',
        component: DatosComponent
      },
      {
        path: 'experiencias',
        component: ExperienciaComponent
      },
      {
        path: 'certificaciones',
        component: CertificacionesComponent
      },
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
