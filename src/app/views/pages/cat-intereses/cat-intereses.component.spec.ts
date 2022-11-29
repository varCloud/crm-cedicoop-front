import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatInteresesComponent } from './cat-intereses.component';

describe('CatInteresesComponent', () => {
  let component: CatInteresesComponent;
  let fixture: ComponentFixture<CatInteresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatInteresesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
