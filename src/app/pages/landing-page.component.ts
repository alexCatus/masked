import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JoinPartyData } from '../model/party.model';
import { PartyFacade } from '../services/party.facade';

@Component({
  selector: 'app-faith-page',
  template: `
    <app-landing
      (joinExistingParty)="onJoinExistingParty($event)"
      (createParty)="onCreateParty($event)"
    ></app-landing>
  `,
  styles: [],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  constructor(private facade: PartyFacade, private router: Router) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onJoinExistingParty(data: JoinPartyData) {
    this.facade.joinExistingParty(data);
    this.router.navigate(['lobby']);
  }
  onCreateParty(username: string) {
    this.facade.createParty(username);
    this.router.navigate(['/lobby']);
  }
}
