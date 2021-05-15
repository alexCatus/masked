import { Injectable, Inject } from '@angular/core';
import {
  Party,
  WithId,
  Message,
  Participant,
  PartyGenerator,
  JoinPartyData,
} from '../../model/party.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { mockParticipants } from '../../utils/hard-coded-data';
import { AngularFireDatabase } from '@angular/fire/database';
import { WarningService } from '../warning.service';
import { startParty } from '../party.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericPartyService {
  //   userId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  //   partyId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  //   party$: Observable<Party & WithId>;
  //   messages$: Observable<(Message & WithId)[]>;
  //   constructor(private warningService: WarningService) {}
  //   /*
  //   createId
  //   generateParty
  //   pass party Id to behavior Subject
  //    */
  //   createParty(currentUser: Participant & WithId, party: Party & WithId) {
  //     this._addToDatabase(party).subscribe(
  //       () => {},
  //       (error) => {
  //         this.warningService.display(
  //           'Something went wrong, please try again',
  //           error
  //         );
  //       },
  //       () => {
  //         this.partyId$.next(partyId);
  //         this.userId$.next(currentUser.id);
  //         this._loadParty();
  //       }
  //     );
  //   }
  //   protected abstract _getId(): string;
  //   protected abstract _addToDatabase(party: Party & WithId): Observable<boolean>;
  //   protected abstract _loadParty();
  //   createParticipant(userName: string): Participant & WithId {
  //     const userId = this._getId();
  //     return {
  //       id: userId,
  //       realName: userName,
  //       falseName: null,
  //     };
  //   }
  //   joinParty(data: JoinPartyData) {
  //     const currentUser: Participant & WithId = this.createParticipant(
  //       data.userName
  //     );
  //     this._joinParty(currentUser, data.partyId).subscribe(
  //       () => {},
  //       (error) => {
  //         this.warningService.display(
  //           'Something went wrong, please try again',
  //           error
  //         );
  //       },
  //       () => {
  //         this.partyId$.next(data.partyId);
  //         this.userId$.next(currentUser.id);
  //         this._loadParty();
  //       }
  //     );
  //   }
  //   protected abstract _joinParty(
  //     participant: Participant,
  //     partyId: string
  //   ): Observable<boolean>;
  //   abstract sendMessage(message: Message, partyId: string);
  //   abstract loadMessages();
  //   startParty() {
  //     this.party$
  //       .pipe(
  //         switchMap((party) => {
  //           const startedParty = startParty(party);
  //           return this._startParty(startedParty);
  //         })
  //       )
  //       .subscribe(
  //         () => {},
  //         (error) => {
  //           this.warningService.display(
  //             'Something went wrong, please try again',
  //             error
  //           );
  //         }
  //       );
  //   }
  //   protected abstract _startParty(
  //     startedParty: Party & WithId
  //   ): Observable<boolean>;
  //   abstract stopParty();
  // }
}
