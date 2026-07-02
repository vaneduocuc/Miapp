import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbtaskService {

  private database!: SQLiteObject;
  private tblSesion: string = `
    CREATE TABLE IF NOT EXISTS sesion_data(
      user_name TEXT(8) PRIMARY KEY NOT NULL, 
      password INTEGER NOT NULL, 
      active INTEGER NOT NULL
    );`;

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite, 
    private storage: Storage, 
    private platform: Platform, 
    private toastController: ToastController
  ) {
    this.inicializarAlmacenamiento();
  }

  dbState(): Observable<boolean> {
    return this.isDbReady.asObservable();
  }

  async inicializarAlmacenamiento() {
    await this.platform.ready();
    
    // Inicializar Ionic Storage requerido por el curso
    await this.storage.create();
    
    // Inicializar base de datos SQLite
    this.sqlite.create({
      name: 'skeleton.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.database = db;
      this.crearTablas();
    })
    .catch(e => console.error("Error al iniciar SQLite", e));
  }

  private async crearTablas() {
    try {
      await this.database.executeSql(this.tblSesion, []);
      this.isDbReady.next(true);
      this.presentToast("Persistencia SQLite y Storage listas");
    } catch (e) {
      this.presentToast("Error al estructurar tablas");
    }
  }

  validarUsuario(user: string, pass: number): Promise<boolean> {
    return this.database.executeSql('SELECT * FROM sesion_data WHERE user_name = ? AND password = ?', [user, pass])
      .then(res => res.rows.length > 0);
  }

  async registrarUsuario(user: string, pass: number): Promise<any> {
    await this.database.executeSql('UPDATE sesion_data SET active = 0', []);
    
    await this.database.executeSql(
      'INSERT OR REPLACE INTO sesion_data(user_name, password, active) VALUES(?, ?, 1)', 
      [user, pass]
    );

    await this.storage.set('USER_LOGGED', user);
    return this.storage.set('SESSION_STATUS', 'active');
  }

  async actualizarEstadoSesion(user: string, activo: number): Promise<any> {
    await this.database.executeSql('UPDATE sesion_data SET active = ? WHERE user_name = ?', [activo, user]);
    if (activo === 0) {
      await this.storage.remove('SESSION_STATUS');
      await this.storage.remove('USER_LOGGED');
    }
  }

  async consultarSesionActiva(): Promise<boolean> {
    const status = await this.storage.get('SESSION_STATUS');
    return status === 'active';
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}