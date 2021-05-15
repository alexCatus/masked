// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { Injectable } from '@angular/core';
// import { from, fromEvent, Observable, of } from 'rxjs';
// import { mapTo, take, filter, map } from 'rxjs/operators';
// import { Party, WithId, Participant } from '../../model/party.model';
// import { GenericPartyService } from './generic-party.service';
// import { WarningService } from '../warning.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class LocalPartyService extends GenericPartyService {
//   constructor(warningService: WarningService) {
//     super(warningService);
//   }
//   protected _getId(): string {
//     throw new Error('Method not implemented.');
//   }
//   protected _addToDatabase(party: Party & WithId): Observable<boolean> {
//     localStorage.setItem(party.id, JSON.stringify(party));
//     return of(true);
//   }
//   protected _loadParty() {
//     this.party$ = fromEvent<StorageEvent>(window, 'storage').pipe(
//       filter((event) => event.storageArea === sessionStorage),
//       filter((event) => event.key === this.partyId$.value),
//       map((event) => JSON.parse(event.newValue))
//     );
//   }

//   protected _joinParty(
//     participant: Participant & WithId,
//     partyId: string
//   ): Observable<boolean> {
//     return of(true);
//   }

//   loadMessages() {
//     this.messages$ = fromEvent<StorageEvent>(window, 'storage').pipe(
//       filter((event) => event.storageArea === sessionStorage),
//       filter((event) => event.key === 'message'),
//       map((event) => JSON.parse(event.newValue))
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

//   sendMessage(message: Message, partyId: string): void {
//     this.db.list(partyId).push(message);
//   }
// }
