import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Party, Message, WithId, Participant } from '../model/party.model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-party-page',
  template: `
    <app-party
      [party]="party$ | async"
      [userId]="userId$ | async"
      (sendMessage)="onSendMessage($event)"
      (stopParty)="onStopParty($event)"
    ></app-party>
  `,
  styles: [],
})
export class PartyPageComponent implements OnInit {
  party$: Observable<Party & WithId>;
  userId$: Observable<string>;
  constructor(
    private service: PartyService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.party$ = this.service.party$.pipe(
      tap((x) => console.log('this.party', x))
    );
    this.userId$ = this.service.userId$;
  }
  ngOnInit() {}
  onSendMessage(data: { message: Message; partyId: string }) {
    this.service.sendMessage(data.message, data.partyId);
  }
  onStopParty(partyId: string) {
    this.service.stopParty(partyId);
  }
}
