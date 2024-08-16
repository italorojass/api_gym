import { TestBed } from '@angular/core/testing';

import { MantenedoresService } from './mantenedores.service';

describe('MantenedoresService', () => {
  let service: MantenedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
