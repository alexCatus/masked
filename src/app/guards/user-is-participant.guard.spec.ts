import { TestBed, async, inject } from '@angular/core/testing';

import { UserIsParticipantGuard } from './user-is-participant.guard';

describe('UserIsParticipantGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIsParticipantGuard]
    });
  });

  it('should ...', inject([UserIsParticipantGuard], (guard: UserIsParticipantGuard) => {
    expect(guard).toBeTruthy();
  }));
});
