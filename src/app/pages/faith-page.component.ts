import { Component, OnInit } from '@angular/core';
import { JoinPartyData } from '../model/party.model';
import { PartyFacade } from '../services/party.facade';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-faith-page',
  template: `
    <app-choose-your-faith
      (joinExistingParty)="onJoinExistingParty($event)"
      (createParty)="onCreateParty($event)"
    ></app-choose-your-faith>
  `,
  styles: [],
})
export class FaithPageComponent implements OnInit {
  constructor(
    private facade: PartyFacade,
    private routerService: RouterService
  ) {}
  ngOnInit() {}
  onJoinExistingParty(data: JoinPartyData) {
    this.facade.joinExistingParty(data);
    this.routerService.navigateToLobby(data.partyId);
  }
  onCreateParty(realName: string) {
    const partyId = this.facade.createParty(realName);
    this.routerService.navigateToLobby(partyId);
  }
}
