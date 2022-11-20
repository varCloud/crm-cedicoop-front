import { TestBed } from '@angular/core/testing';

import { TipoSeguimientoService } from './tipo-seguimiento.service';

describe('TipoSeguimientoService', () => {
  let service: TipoSeguimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSeguimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
