import { TestBed } from '@angular/core/testing';

import { PreciosService } from './precios.service';

describe('PreciosService', () => {
  let service: PreciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
