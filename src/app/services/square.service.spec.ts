import { TestBed } from '@angular/core/testing';

import { SquareService } from './square.service';

describe('SquareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SquareService = TestBed.get(SquareService);
    expect(service).toBeTruthy();
  });
});
