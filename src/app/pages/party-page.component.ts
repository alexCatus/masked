import { Component, OnInit } from '@angular/core';
import { Party, Message, Participant } from '../model/party.model';
import { combineLatest, Observable } from 'rxjs';
import { PartyFacade } from '../services/party.facade';
import { filter, map } from 'rxjs/operators';
import { PartyComponentInfo } from '../components/party/party.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-game-page',
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
      this.facade.getParty(),
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
      }),
      filter((x) => !!x)
    );
  }
  onSendMessage(data: { message: Message; partyId: string }) {
    this.facade.sendMessage(data.message);
  }
  onStopParty(partyId: string) {
    // this.facade.stopParty(partyId);
  }
}
