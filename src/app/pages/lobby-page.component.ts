import { Component, OnInit } from '@angular/core';
import { Party, WithId } from '../model/party.model';
import { combineLatest, Observable, of } from 'rxjs';
import { PartyFacade } from '../services/party.facade';
import { switchMap, tap } from 'rxjs/operators';
import { RouterService } from '../services/router.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-lobby-page',
  template: `
    <app-lobby
      [party]="party$ | async"
      [userId]="userId$ | async"
      [canStartParty]="canStartParty$ | async"
      (startParty)="onStartParty()"
    ></app-lobby>
  `,
  styles: [],
})
export class LobbyPageComponent implements OnInit {
  userId$: Observable<string>;
  party$: Observable<Party>;
  canStartParty$: Observable<boolean> = of(true);
  hasStarted$: Observable<boolean> = of(false);
  constructor(private facade: PartyFacade, private router: Router) {}

  ngOnInit() {
    this.party$ = this.facade.getParty().pipe(tap(party => {
      if (party.isRunning) {
        this.router.navigate(['/party']);
      }
    }  
    ));
    this.userId$ = this.facade.userId$;
  }

  onStartParty() {
    this.facade.beginParty();
  }
}
