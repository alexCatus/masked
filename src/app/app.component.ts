import { Component } from '@angular/core';
import { PartyFacade } from './services/party.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Masked';
  constructor(private partyFacade: PartyFacade) {
    // this.partyFacade.loadParty();
  }
}
