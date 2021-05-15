// import { Injectable } from '@angular/core';
// import { Party, WithId, Message, Participant } from '../../model/party.model';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/firestore';
// import { BehaviorSubject, from, Observable } from 'rxjs';
// import * as _ from 'lodash';
// import { mapTo, switchMap, take } from 'rxjs/operators';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { GenericPartyService } from './generic-party.service';
// import { WarningService } from '../warning.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class FireStorePartyService extends GenericPartyService {
//   partyRef$: BehaviorSubject<
//     AngularFirestoreDocument<Party & WithId>
//   > = new BehaviorSubject<AngularFirestoreDocument<Party & WithId>>(undefined);

//   constructor(
//     private firestore: AngularFirestore,
//     private db: AngularFireDatabase,
//     warningService: WarningService
//   ) {
//     super(warningService);
//   }
//   protected _getId(): string {
//     throw new Error('Method not implemented.');
//   }
//   protected _addToDatabase(party: Party & WithId): Observable<boolean> {
//     this.partyRef$.next(
//       this.firestore.collection('party').doc<Party & WithId>(party.id)
//     );
//     return from(this.partyRef$.value.set(party)).pipe(mapTo(true), take(1));
//   }
//   protected _loadParty() {
//     this.party$ = this.partyRef$.pipe(
//       switchMap((partyDoc) => partyDoc.valueChanges())
//     );
//   }
//   protected _joinParty(
//     participant: Participant & WithId,
//     partyId: string
//   ): Observable<boolean> {
//     return from(
//       this.partyRef$.value.update({
//         ['participants.' + participant.id]: participant,
//       })
//     ).pipe(mapTo(true), take(1));
//   }

//   loadMessages() {
//     this.messages$ = this.partyId$.pipe(
//       switchMap((partyId) =>
//         this.db.list<Message & WithId>(partyId).valueChanges()
//       )
//     );
//   }
//   protected _startParty(startedParty: Party & WithId): Observable<boolean> {
//     return from(
//       this.firestore.firestore.runTransaction((transaction) =>
//         transaction.get(this.partyRef$.value.ref).then((party) => {
//           transaction.update(this.partyRef$.value.ref, startedParty);
//         })
//       )
//     ).pipe(mapTo(true), take(1));
//   }

//   stopParty() {
//     return from(
//       this.partyRef$.value.update({
//         isRunning: false,
//       })
//     ).pipe(mapTo(true), take(1));
//   }

//   sendMessage(message: Message) {
//     this.db.list(partyId).push(message);
//   }
// }
