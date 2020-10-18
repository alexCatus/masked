import { Injectable } from '@angular/core';
import {
  Party,
  WithId,
  Message,
  Participant,
  JoinPartyData,
} from '../model/party.model';
import { combineLatest, Observable } from 'rxjs';
import { PartyService } from './party.service';
import { map, tap } from 'rxjs/operators';

import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class PartyFacade {
  userId$: Observable<string> = this.service.userId$;
  party$(): Observable<Party & WithId> {
    return this.service.getParty();
  }

  partyExists() {
    return this.service.partyRef$.pipe(map((x) => !!x));
  }

  getUser$(): Observable<Participant> {
    return combineLatest([this.party$(), this.userId$]).pipe(
      map(([party, userId]) => {
        return { ...party.participants[userId], id: userId };
      })
    );
  }

  isCurrentUserParticipant$(): Observable<boolean> {
    return this.getUser$().pipe(
      map((user) => {
        console.log(user);
        return !!user.userId;
      })
    );
  }

  isInProgress$(): Observable<boolean> {
    return this.party$().pipe(map((party) => party.isRunning));
  }

  canStartParty$(): Observable<boolean> {
    return this.party$().pipe(
      map((party) => Object.keys(party.participants).length > 3)
    );
  }

  isLoaded$(): Observable<boolean> {
    return combineLatest([this.party$(), this.getUser$()]).pipe(
      map(([party, user]) => !!party && !!user)
    );
  }
  constructor(private service: PartyService) {}

  createParty(userName: string) {
    const id = this.service.createParty();
    this.service.joinParty(userName);
    return id;
  }

  joinExistingParty(data: JoinPartyData) {
    this.service.loadParty(data.partyId);
    this.service.joinParty(data.userName);
  }

  loadParty(partyId: string) {
    this.service.loadParty(partyId);
  }

  sendMessage(message: Message, partyId: string) {
    this.service.sendMessage(message, partyId);
  }
  beginParty() {
    this.service.beginParty();
  }

  stopParty(partyId: string) {
    this.service.stopParty();
  }
  getMessages(): Observable<Message[]> {
    return this.service.getMessages();
  }
}
