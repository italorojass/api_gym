import { TestBed } from '@angular/core/testing';

import { InstructoresService } from './instructores.service';

describe('InstructoresService', () => {
  let service: InstructoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
