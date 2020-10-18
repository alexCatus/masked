import { TestBed, async, inject } from '@angular/core/testing';

import { PartyInProgressGuard } from './party-in-progress.guard';

describe('PartyInProgressGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyInProgressGuard]
    });
  });

  it('should ...', inject([PartyInProgressGuard], (guard: PartyInProgressGuard) => {
    expect(guard).toBeTruthy();
  }));
});
