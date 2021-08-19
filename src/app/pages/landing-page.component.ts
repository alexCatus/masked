import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JoinPartyData } from '../model/party.model';
import { PartyFacade } from '../services/party.facade';

@Component({
  selector: 'app-landing-page',
  template: `
    <app-landing (createParty)="onCreateParty($event)"></app-landing>
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
  onCreateParty(username: string) {
    this.facade.createParty(username);
  }
}
