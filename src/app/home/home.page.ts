import { Component, OnInit, OnDestroy } from '@angular/core'; // 🚀 Importamos OnDestroy para la limpieza del GPS 
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// 🚀 IMPORTACIONES DEL PASO 2: Importamos el plugin nativo de la Cámara [cite: 328, 344]
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// 🚀 IMPORTACIONES DEL PASO 3: Importamos el plugin nativo de Geolocalización [cite: 367, 389, 391]
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class HomePage implements OnInit, OnDestroy { // 🚀 Implementamos OnDestroy 

  // 🚀 VARIABLE DEL PASO 2: Almacena la ruta de la foto capturada en memoria [cite: 340, 356]
  imagenCapturada: string | undefined = '';

  // 🚀 VARIABLES DEL PASO 3: Manejo de coordenadas en tiempo real y ID del observador [cite: 365, 501]
  latitud: number | null = null;
  longitud: number | null = null;
  idWatcher: string | null = null; // Identificador único para apagar el GPS 

  constructor(private router: Router) { }

  ngOnInit() {
    // Al entrar al Home, redirige automáticamente a la pestaña de perfil (Mis Datos)
    this.router.navigate(['home/perfil']);

    // 🚀 Inicializamos de inmediato la captura asíncrona de coordenadas del GPS [cite: 494]
    this.iniciarRastreoGps();
  }

  /**
   * 🔋 PERFORMANCE EVALUADA: Método del ciclo de vida que se ejecuta al destruir o salir de la vista 
   * Detiene el consumo de hardware del sensor de GPS para resguardar la batería del terminal 
   */
  async ngOnDestroy() {
    if (this.idWatcher) {
      await Geolocation.clearWatch({ id: this.idWatcher }); // 🚀 Se limpia el observador nativo 
      console.log('Sensor de Geolocalización apagado correctamente para optimizar performance.');
    }
  }

  // 1. Aquí colocamos la función del segmento que pide el profesor
  segmentChanged($event: any) {
    let direction = $event.detail.value;
    // Redirige dinámicamente a home/perfil, home/experiencias o home/certificaciones
    this.router.navigate(['home/' + direction]);
  }

  // 2. Aquí colocamos la función para cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
    // Al salir ejecutamos la limpieza de la vista
    this.ngOnDestroy();
    // Más adelante actualizaremos aquí el estado de la sesión en SQLite y Storage
    this.router.navigate(['/login']);
  }

  /**
   * 📸 PASO 2.3: Función asíncrona para tomar una foto con la cámara del dispositivo [cite: 329, 345]
   * Invoca los componentes de hardware nativos y guarda el resultado de forma asíncrona [cite: 280, 494]
   */
  async tomarFotografia() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,                      // Calidad de resolución de la imagen (0-100) [cite: 331, 347]
        allowEditing: false,              // Desactivado para evitar bloqueos innecesarios en Android [cite: 332, 348]
        resultType: CameraResultType.Uri, // Retorna una URI temporal idónea para renderizar en la vista web [cite: 333, 349]
        source: CameraSource.Camera       // Fuerza al sistema a abrir la cámara frontal/trasera en lugar de la galería
      });

      // Guardamos la ruta web extraída del objeto nativo en nuestra variable local [cite: 340, 356]
      this.imagenCapturada = image.webPath; // [cite: 340, 356]
      console.log('Fotografía capturada con éxito en:', this.imagenCapturada);

    } catch (error) {
      console.error('El usuario canceló o cerró la interfaz de la cámara:', error);
    }
  }

  /**
   * 🗺️ PASO 3.2: Rastreo asíncrono continuo de la localización del dispositivo [cite: 365, 494]
   * Escucha las mutaciones de coordenadas espaciales entregadas por el GPS [cite: 365, 501]
   */
  async iniciarRastreoGps() {
    try {
      // watchPosition registra un hilo activo que recibe actualizaciones constantes del sensor [cite: 365]
      this.idWatcher = await Geolocation.watchPosition(
        { enableHighAccuracy: true }, // Solicita la máxima precisión (módulo de GPS puro) [cite: 374, 382]
        (position, err) => {
          if (position) {
            this.latitud = position.coords.latitude;  // Almacenamos la latitud calculada [cite: 501]
            this.longitud = position.coords.longitude; // Almacenamos la longitud calculada [cite: 501]
            console.log('Nuevas coordenadas GPS establecidas de forma asíncrona:', this.latitud, this.longitud);
          }
          if (err) {
            console.error('Fallo en el callback de actualización del sensor:', err);
          }
        }
      );
    } catch (error) {
      console.error('No se pudo acceder a las APIs de localización nativa:', error);
    }
  }

}
