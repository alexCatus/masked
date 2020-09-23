import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Router } from '@angular/router';
import { JoinPartyData } from '../model/party.model';

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
  constructor(private service: PartyService, private router: Router) {}
  ngOnInit() {}
  onJoinExistingParty(data: JoinPartyData) {
    this.router.navigate(['/lobby', data.partyId]);
  }
  onCreateParty(realName: string) {
    const partyId = this.service.createParty(realName);
    this.router.navigate(['/lobby', partyId]);
  }
}
