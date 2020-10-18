import { TestBed } from '@angular/core/testing';
import { PartyFacade } from './party.facade';

import { PartyService } from './party.service';

describe('PartyFacade', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const facade: PartyFacade = TestBed.get(PartyService);
    expect(facade).toBeTruthy();
  });
});
