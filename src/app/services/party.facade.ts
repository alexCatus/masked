import { Injectable } from '@angular/core';
import {
  Party,
  WithId,
  Message,
  Participant,
  JoinPartyData,
} from '../model/party.model';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';
import { IdService } from './id.service';
import { PartyService } from './archives/party.service';
import { MessageService } from './message.service';
import { startParty } from './party.utils';
import { AngularFirestore } from '@angular/fire/firestore';

const mockedParty = {
  id: 'party_1',
  isRunning: false,
  messages: [],
  participants: {
    '0001': {
      id: '0001',
      realName: 'Alex',
      falseName: null,
    },
    '0002': {
      id: '0002',
      realName: 'Roberto',
      falseName: null,
    },
    '0003': {
      id: '0003',
      realName: 'Sandrine',
      falseName: null,
    },
    '0004': {
      id: '0004',
      realName: 'Maferine',
      falseName: null,
    },
  },
};
@Injectable({
  providedIn: 'root',
})
export class PartyFacade {
  userId$: BehaviorSubject<string> = new BehaviorSubject<string>('0001');
  party$: Observable<Party>;

partyId: string;
  constructor(
    private firestore: AngularFirestore,
    private idService: IdService
  ) {}

  createParty(userName: string) {
    const participantId = '0005';
    const newParty = {
      ...mockedParty,
      participants: {
        ...mockedParty.participants,
        [participantId]: {
          id: '0005',
          realName: userName,
          falseName: null,
        },
      },
    };
    this.partyId = this.firestore.createId();
    this.firestore.collection<Party>('parties').doc(this.partyId).set(newParty);
    this.userId$.next(participantId);
  }
  joinExistingParty(data: JoinPartyData) {
    const participant = {
      realName: data.userName,
      falseName: null,
    };
  }
  getParty():Observable<Party> {
    return this.firestore.doc<Party>('parties/'+this.partyId).valueChanges();
  }
  sendMessage(message: Message) {}
  beginParty() {
    // this.party$.next(startParty(this.party$.value));
    // this.partyService.startParty();
  }

  stopParty() {
    // this.partyService.stopParty();
  }
  loadMessages() {
    // this.messagesService.load();
  }
}
