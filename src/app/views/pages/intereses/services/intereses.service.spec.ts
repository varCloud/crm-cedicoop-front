import { TestBed } from '@angular/core/testing';

import { InteresesService } from './intereses.service';

describe('InteresesService', () => {
  let service: InteresesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
