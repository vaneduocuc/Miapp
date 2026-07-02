import { Injectable } from '@angular/core';
// Dependencias de Angular para conectividad HTTP
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; [cite: 81, 82]
// Operadores para manejo de flujos asíncronos y reintentos
import { retry, catchError } from 'rxjs/operators'; [cite: 83]
// 🚀 CORRECCIÓN: Agregamos "of" para poder retornar los datos offline como un Observable
import { Observable, throwError, of } from 'rxjs'; [cite: 84]

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Variable para las opciones Http con su cabecera correspondiente
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', // Transaccionar mensajes en formato JSON [cite: 78, 91]
      'Access-Control-Allow-Origin': '*'  // Solicitudes con menos dificultades de CORS [cite: 78, 92]
    })
  }; [cite: 89]

  // URL base de la API a consumir mediante una variable global
  apiURL = 'https://jsonplaceholder.typicode.com'; [cite: 95, 96]

  // Declaramos e inyectamos la variable http de tipo HttpClient
  constructor(private http: HttpClient) { } [cite: 97, 98]

  /**
   * 1. READ (Lectura) con Persistencia Offline Inteligente
   * Intenta conectar con la API Rest. Si el dispositivo no tiene internet o da error,
   * captura el fallo y retorna un set de datos de respaldo.
   */
  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + '/posts').pipe(
      retry(3), // Intenta reconectar hasta 3 veces de forma síncrona [cite: 128]
      catchError((error: HttpErrorResponse) => {
        console.warn('⚠️ API Rest inalcanzable o Error 404 detectado:', error.status); [cite: 694]
        console.log('🔄 Activando persistencia offline automática para el cliente.'); [cite: 693]

        // Simulamos el retorno de los datos almacenados localmente con anterioridad (Semana 6) [cite: 693]
        const datosLocalesPersistentes = [
          {
            id: 1,
            title: 'Aviso Importante: Modo Offline Activo',
            body: 'Estás viendo datos respaldados localmente en el dispositivo porque no dispones de conexión a internet activa.',
            userId: 1
          }
        ]; 

        // Retornamos el arreglo local encapsulado en un Observable para que el .subscribe() no se rompa [cite: 211, 212]
        return of(datosLocalesPersistentes); 
      })
    );
  }

  /**
   * 2. CREATE (Crear) - Crear un objeto mediante POST
   * Envía un cuerpo (body) al servidor transfiriendo la información oculta [cite: 167]
   */
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiURL + '/posts', post, this.httpOptions).pipe(
      retry(3), [cite: 172]
      catchError(this.handleError)
    );
  }

  /**
   * 3. DELETE (Eliminar) - Eliminación de objetos mediante su ID
   * Envía por la URL el identificador único del elemento que deseamos remover [cite: 200]
   */
  deletePost(id: any): Observable<any> {
    return this.http.delete(this.apiURL + '/posts/' + id, this.httpOptions).pipe(
      retry(3), // Mantenemos la consistencia de reintentos exigida [cite: 189]
      catchError(this.handleError)
    );
  }

  // Función interna para capturar y procesar errores de cara al cliente
  private handleError(error: HttpErrorResponse) {
    console.error('Error capturado en la API:', error.status);
    return throwError(() => new Error('Error de comunicación con la API Rest.'));
  }
}