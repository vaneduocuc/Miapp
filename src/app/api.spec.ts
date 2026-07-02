import { TestBed } from '@angular/core/testing';
// Importamos el módulo de simulación para peticiones HTTP en pruebas
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api'; // Importamos tu servicio real

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Configuramos el entorno seguro de pruebas
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no queden peticiones HTTP colgadas
  });

  it('debería crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });
});