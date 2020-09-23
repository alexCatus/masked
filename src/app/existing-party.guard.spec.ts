import { TestBed, async, inject } from '@angular/core/testing';

import { ExistingPartyGuard } from './existing-party.guard';

describe('ExistingPartyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistingPartyGuard]
    });
  });

  it('should ...', inject([ExistingPartyGuard], (guard: ExistingPartyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
