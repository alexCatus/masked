import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Party } from '../model/party.model';
import { PartyService } from '../services/archives/party.service';
import { AuthService } from '../services/auth.service';

enum CURRENT_PAGE {
  LANDING = 'landing',
  LOBBY = 'lobby',
  GAME = 'game',
}

@Component({
  selector: 'app-auth-page',
  template: ` <ng-container [ngSwitch]="currentPage | async">
    <app-lobby-page *ngSwitchCase="CURRENT_PAGE.LOBBY"></app-lobby-page>
    <app-game-page *ngSwitchCase="CURRENT_PAGE.LOBBY"></app-game-page>
    <app-landing-page ngSwitchDefault></app-landing-page>
  </ng-container>`,

  styles: [],
})
export class AuthPageComponent {
  CURRENT_PAGE = CURRENT_PAGE;
  currentPage: Observable<CURRENT_PAGE>;
  constructor(private partyService: PartyService) {
    this.currentPage = this.partyService.party$.pipe(
      map((x) =>
        !!x
          ? x.isRunning
            ? CURRENT_PAGE.GAME
            : CURRENT_PAGE.LOBBY
          : CURRENT_PAGE.LANDING
      )
    );
  }
}
