import { Component, OnInit } from '@angular/core';
import { Party, Message, WithId, Participant } from '../model/party.model';
import { Observable } from 'rxjs';
import { PartyFacade } from '../services/party.facade';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-party-page',
  template: `
    <app-party
      [party]="party$ | async"
      [userId]="userId$ | async"
      [user]="user$ | async"
      [messages]="messages$ | async"
      (sendMessage)="onSendMessage($event)"
      (stopParty)="onStopParty($event)"
    ></app-party>
  `,
  styles: [],
})
export class PartyPageComponent implements OnInit {
  party$: Observable<Party & WithId>;
  userId$: Observable<string>;
  user$: Observable<Participant>;
  isLoaded$: Observable<boolean>;
  messages$: Observable<Message[]>;
  constructor(private facade: PartyFacade) {}
  ngOnInit() {
    this.party$ = this.facade.party$();
    this.userId$ = this.facade.userId$;
    this.user$ = this.facade.getUser$();
    this.messages$ = this.facade.getMessages();
  }
  onSendMessage(data: { message: Message; partyId: string }) {
    this.facade.sendMessage(data.message, data.partyId);
  }
  onStopParty(partyId: string) {
    this.facade.stopParty(partyId);
  }
}
