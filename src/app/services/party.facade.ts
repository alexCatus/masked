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
import * as firebase from 'firebase';

const mockedParty = {
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
    private db: AngularFirestore,
    private idService: IdService
  ) {}

  createParty(userName: string) {
    const participantId = this.db.createId();
    this.partyId = this.db.createId();
    const newParty = {
      id: this.partyId,
      ...mockedParty,
      participants: {
        ...mockedParty.participants,
        [participantId]: {
          id: participantId,
          realName: userName,
          falseName: null,
        },
      },
    };
    this.db.collection<Party>('parties').doc(this.partyId).set(newParty);
    this.userId$.next(participantId);
  }
  joinExistingParty(data: JoinPartyData) {
    const participant = {
      id: this.db.createId(),
      realName: data.userName,
      falseName: null,
    };
    this.userId$.next(participant.id);
    this.partyId = data.partyId;
    
    this.db.doc<Party>('parties/'+this.partyId).update({
      ['participants.'+participant.id]: participant
    });
    
  }
  getParty():Observable<Party> {
    return this.db.doc<Party>('parties/'+this.partyId).valueChanges();
  }
  sendMessage(message: Message) {}
  beginParty() {
    
    // Create a reference to the party doc.
    var partyRef = this.db.collection('parties').doc(this.partyId).ref;

    this.db.firestore.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(partyRef).then((partyDoc) => {
            if (!partyDoc.exists) {
                throw "Document does not exist!";
            }
            var party = startParty(partyDoc.data());
            transaction.update(partyRef, party);
           
        });
    }).then(() => {
        console.log("Transaction successfully committed!");
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });

  }

  stopParty() {
    // this.partyService.stopParty();
  }
  loadMessages() {
    // this.messagesService.load();
  }
}
