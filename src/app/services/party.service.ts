import { Injectable, Inject } from '@angular/core';
import {
  Party,
  WithId,
  Message,
  Participant,
  PartyGenerator,
} from '../model/party.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { mockParticipants } from '../utils/hard-coded-data';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  partyRef$: BehaviorSubject<
    AngularFirestoreDocument<Party & WithId>
  > = new BehaviorSubject<AngularFirestoreDocument<Party & WithId>>(undefined);
  userId$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  partyId$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  createParty(): string {
    const partyId = this.firestore.createId();
    const party = PartyGenerator(partyId);
    this.partyId$.next(partyId);

    this.partyRef$.next(
      this.firestore.collection('party').doc<Party & WithId>(partyId)
    );
    this.partyRef$.value.set(party);
    return partyId;
  }
  getParty() {
    return this.partyRef$.pipe(
      switchMap((partyDoc) => partyDoc.valueChanges())
    );
  }

  loadParty(partyId: string) {
    this.partyId$.next(partyId);
    this.partyRef$.next(
      this.firestore.collection('party').doc<Party & WithId>(partyId)
    );
  }

  joinParty(userName: string) {
    const userId = this.firestore.createId();
    const currentUser: Participant = {
      userId: userId,
      realName: userName,
      falseName: null,
    };
    this.partyRef$.value.update({
      ['participants.' + userId]: currentUser,
    });
    this.userId$.next(userId);
  }

  sendMessage(message: Message, partyId: string) {
    this.db.list(partyId).push(message);
  }
  getMessages(): Observable<Message[]> {
    return this.partyId$.pipe(
      switchMap((partyId) => this.db.list<Message>(partyId).valueChanges())
    );
  }
  beginParty() {
    this.firestore.firestore.runTransaction((transaction) =>
      transaction.get(this.partyRef$.value.ref).then((party) => {
        const startedParty = startParty(party.data() as Party & WithId);
        transaction.update(this.partyRef$.value.ref, startedParty);
      })
    );
  }

  stopParty() {
    this.partyRef$.value.update({
      isRunning: false,
    });
  }
}
function startParty(party: Party & WithId) {
  const participants = assignateName({
    ...party.participants,
  });
  return {
    ...party,
    participants: participants,
    isRunning: true,
  };
}
function assignateName(participants: { [key: string]: Participant }) {
  const participantsCloned = _.clone(participants);
  let realNames: Participant[] = _.values(participants);
  let falseNames: string[] = _.clone(realNames).map(
    (participant) => participant.userId
  );
  while (
    !realNames.every((value, index) => falseNames[index] != value.userId)
  ) {
    falseNames = _.shuffle(falseNames);
  }
  falseNames.forEach((value, index) => {
    const key = realNames[index].userId;
    participantsCloned[key].falseName = participants[value].realName;
  });
  return participantsCloned;
}
