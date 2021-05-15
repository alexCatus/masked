import { Component, OnInit } from '@angular/core';
import { Party, Message, WithId, Participant } from '../model/party.model';
import { combineLatest, Observable } from 'rxjs';
import { PartyFacade } from '../services/party.facade';
import { filter, map, tap } from 'rxjs/operators';
import { PartyComponentInfo } from '../components/party/party.component';

@Component({
  selector: 'app-party-page',
  template: `
    <app-party
      [partyInfo]="partyInfo$ | async"
      [messages]="messages$ | async"
      (sendMessage)="onSendMessage($event)"
      (stopParty)="onStopParty($event)"
    ></app-party>
  `,
  styles: [],
})
export class PartyPageComponent implements OnInit {
  partyInfo$: Observable<PartyComponentInfo>;
  party$: Observable<Party>;
  userId$: Observable<string>;
  user$: Observable<Participant>;
  isLoaded$: Observable<boolean>;
  messages$: Observable<Message[]>;
  constructor(private facade: PartyFacade) {}
  ngOnInit() {
    this.partyInfo$ = combineLatest([
      this.facade.party$,
      this.facade.userId$,
    ]).pipe(
      filter(([x, y]) => !!x && !!y),
      map(([party, userId]) => {
        const participants = Object.values(party.participants).filter(
          (x) => x.id != userId
        );
        const user = party.participants[userId];
        const trueParticipants = _.shuffle(participants.map((x) => x.realName));
        const falseParticipants = _.shuffle(
          participants.map((x) => x.falseName)
        );
        return {
          party: party,
          user: user,
          trueParticipants: trueParticipants,
          falseParticipants: falseParticipants,
        };
      })
    );
  }
  onSendMessage(data: { message: Message; partyId: string }) {
    // this.facade.sendMessage(data.message, data.partyId);
  }
  onStopParty(partyId: string) {
    // this.facade.stopParty(partyId);
  }
}
