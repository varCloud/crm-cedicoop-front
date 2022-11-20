import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSeguimientoComponent } from './tipo-seguimiento.component';

describe('TipoSeguimientoComponent', () => {
  let component: TipoSeguimientoComponent;
  let fixture: ComponentFixture<TipoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
