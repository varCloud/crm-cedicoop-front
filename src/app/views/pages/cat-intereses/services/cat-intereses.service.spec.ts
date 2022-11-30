import { TestBed } from '@angular/core/testing';

import { CatInteresesService } from './cat-intereses.service';

describe('CatInteresesService', () => {
  let service: CatInteresesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatInteresesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
