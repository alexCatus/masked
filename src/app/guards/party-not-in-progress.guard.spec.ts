import { TestBed, async, inject } from '@angular/core/testing';

import { PartyNotInProgressGuard } from './party-not-in-progress.guard';

describe('PartyNotInProgressGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyNotInProgressGuard]
    });
  });

  it('should ...', inject([PartyNotInProgressGuard], (guard: PartyNotInProgressGuard) => {
    expect(guard).toBeTruthy();
  }));
});
