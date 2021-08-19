import { Injectable } from '@angular/core';
import { Party, WithId, Message, Participant } from '../../model/party.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { WarningService } from '../warning.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL: string = environment.serverUrl;
const URL_PARTIES = URL + 'parties/';
const URL_PARTICIPANTS = URL + 'participants';
@Injectable({
  providedIn: 'root',
})
export class PartyService {
  userId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  partyId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  party$: Observable<Party & WithId> = of();
  messages$: Observable<(Message & WithId)[]>;

  constructor(
    private http: HttpClient,
    private warningService: WarningService
  ) {}
  getParties(id: string): Observable<any> {
    return this.http.get(URL_PARTIES + '?_sort=id&_order=desc');
    //   .pipe(map((response: HttpResponse<any>) => response.json()));
  }
  get(id: string): Observable<Party & WithId> {
    console.log('what de thuck');
    return this.http.get(URL_PARTIES + `?id=${id}`).pipe(
      map((response: HttpResponse<any>) => response[0]),
      tap((x) => {
        console.log('WAZZUP', x);
      })
    );
  }

  getPartyParticipants(partyId: string) {
    return this.http.get(URL_PARTICIPANTS + `?partyId=${partyId}`).pipe(
      map((response: HttpResponse<any>) => response),
      tap((x) => {
        console.log('WAZZUP', x);
      })
    );
  }
  addParty(participant: Participant, party: Partial<Party>) {
    return this.http.post(URL_PARTIES, party).pipe(
      switchMap((party: any & WithId) => {
        this.partyId$.next(party.id);
        this.partyId$.next(party.id);
        const p = {
          ...participant,
          partyId: party.id,
        };
        return this.http.post(URL_PARTICIPANTS, p);
      }),
      tap((user: any & WithId) => this.userId$.next(user.id))
    );
  }
  addUserToParty(participant: Participant, partyId: string) {
    return this.get(partyId).pipe(
      filter((x) => !!x),
      switchMap((party: any & WithId) => {
        this.partyId$.next(party.id);
        const p = {
          ...participant,
          partyId: partyId,
        };
        return this.http.post(URL_PARTICIPANTS, p);
      }),
      tap((user: any & WithId) => this.userId$.next(user.id))
    );
  }
  /*
  createId
  generateParty
  pass party Id to behavior Subject
   */
  // createParty(userName: string) {
  //   const currentUser: Participant & WithId = this.createParticipant(userName);
  //   const partyId = this._getId();
  //   const party = PartyGenerator(partyId, currentUser);
  //   this._addToDatabase(party).subscribe(
  //     () => {},
  //     (error) => {
  //       this.warningService.display(
  //         'Something went wrong, please try again',
  //         error
  //       );
  //     },
  //     () => {
  //       this.partyId$.next(partyId);
  //       this.userId$.next(currentUser.id);
  //       this._loadParty();
  //     }
  //   );
  // }
  // _getId(): string;
  // _addToDatabase(party: Party & WithId): Observable<boolean>;
  // _loadParty();

  // createParticipant(userName: string): Participant & WithId {
  //   const userId = this._getId();
  //   return {
  //     id: userId,
  //     realName: userName,
  //     falseName: null,
  //   };
  // }

  // _joinParty(participant: Participant, partyId: string): Observable<boolean>;

  // abstract sendMessage(message: Message, partyId: string);
  // abstract loadMessages();
  // startParty() {
  //   this.party$
  //     .pipe(
  //       switchMap((party) => {
  //         const startedParty = startParty(party);
  //         return this._startParty(startedParty);
  //       })
  //     )
  //     .subscribe(
  //       () => {},
  //       (error) => {
  //         this.warningService.display(
  //           'Something went wrong, please try again',
  //           error
  //         );
  //       }
  //     );
  // }
  // _startParty(startedParty: Party & WithId): Observable<boolean> {}
  stopParty() {}
}
