import { Injectable, Inject } from '@angular/core';
import { Party, WithId, Message, Participant } from '../model/party.model';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}
  userId$: BehaviorSubject<string> = new BehaviorSubject('');
  party$: BehaviorSubject<Party & WithId> = new BehaviorSubject(undefined);

  createParty(userName: string): string {
    const partyId = 'newPartyId' + _.random(0, 200);
    const userId = 'userId' + _.random(0, 200);
    const party: Party & WithId = {
      id: partyId,
      isRunning: false,
      messages: [],
      participants: {
        [userId]: {
          userId: userId,
          realName: userName,
          falseName: null,
        },
        '0002': {
          userId: '0002',
          realName: 'Natasha',
          falseName: null,
        },
        '0003': {
          userId: '0003',
          realName: 'Joanie',
          falseName: null,
        },
        '0004': {
          userId: '0004',
          realName: 'Sarah',
          falseName: null,
        },
      },
    };
    this.storage.set('userId', userId);
    this.storage.set(partyId, party);
    return partyId;
  }
  joinExistingParty(partyId: string): boolean {
    const party = this.storage.get(partyId);
    const userId = this.storage.get('userId');
    console.log('partyId', partyId);
    console.log('party', party);
    console.log('userId', userId);
    if (!!partyId && !!party && !!userId) {
      this.userId$.next(userId);
      this.party$.next(party);
      return true;
    }
    return false;
  }

  getParty(partyId: string): Observable<Party & WithId> {
    return this.storage.get(partyId);
  }
  sendMessage(message: Message, partyId: string) {
    console.log('IN SEND MESSAGE SERVICE');
    const party = this.storage.get(partyId) as Party & WithId;
    party.messages.push(message);
    this.storage.set(partyId, party);
    this.party$.next(party);
  }
  beginParty(partyId: string) {
    const party = this.storage.get(partyId) as Party & WithId;
    if (!party.isRunning) {
      assignateName(party.participants);
      party.isRunning = true;
      this.storage.set(partyId, party);
      this.party$.next(party);
    }
  }
  stopParty(partyId: string) {
    const party = this.storage.get(partyId) as Party & WithId;
    if (party.isRunning) {
      party.isRunning = false;
      this.storage.set(partyId, party);
      this.party$.next(party);
    }
  }
}
function assignateName(participants: { [key: string]: Participant }) {
  let realNames: Participant[] = _.values(participants);
  let falseNames: string[] = _.clone(realNames).map(
    (participant) => participant.userId
  );
  while (
    !realNames.every((value, index) => falseNames[index] != value.userId)
  ) {
    console.count();
    console.table(realNames);
    console.table(falseNames);
    falseNames = _.shuffle(falseNames);
  }
  falseNames.forEach((value, index) => {
    console.log('ici');
    const key = realNames[index].userId;
    console.log('key', key);
    participants[key].falseName = participants[value].realName;
    console.log('participant', participants[key]);
  });
}
