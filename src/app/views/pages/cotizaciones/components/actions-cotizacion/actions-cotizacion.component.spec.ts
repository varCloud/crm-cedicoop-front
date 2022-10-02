import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCotizacionComponent } from './actions-cotizacion.component';

describe('ActionsCotizacionComponent', () => {
  let component: ActionsCotizacionComponent;
  let fixture: ComponentFixture<ActionsCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
