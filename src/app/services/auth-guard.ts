import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Apunta de forma exacta a tu servicio de base de datos local
import { DbtaskService } from './dbtask'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dbTask: DbtaskService, private router: Router) {}

  /**
   * 🔒 Método canActivate Asíncrono
   * Consulta el estado de persistencia real en el almacenamiento del teléfono [cite: 576, 684]
   */
  async canActivate(): Promise<boolean> {
    console.log('🛡️ [AuthGuard] Verificando estado de la sesión en SQLite/Storage...');

    try {
      // Consulta real en el almacenamiento nativo del teléfono [cite: 684, 686]
      const activeSession = await this.dbTask.consultarSesionActiva();

      if (activeSession) {
        console.log('🟢 [AuthGuard] Sesión activa detectada. Acceso concedido al Home.');
        return true; // Permite el ingreso de forma normal al usuario logueado [cite: 599]
      } else {
        console.warn('🔴 [AuthGuard] No se encontró sesión activa. Acceso denegado.');
        this.router.navigate(['/login']); // Redirige de forma automática al Login [cite: 598]
        return false; // Bloquea la activación de la ruta [cite: 577]
      }
    } catch (error) {
      console.error('❌ [AuthGuard] Error al consultar la sesión en la base de datos:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}