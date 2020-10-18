import { Component, OnInit } from '@angular/core';
import { Party, WithId } from '../model/party.model';
import { Observable } from 'rxjs';
import { PartyFacade } from '../services/party.facade';
import { tap } from 'rxjs/operators';
import { RouterService } from '../services/router.service';
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
  party$: Observable<Party & WithId>;
  canStartParty$: Observable<boolean>;
  hasStarted$: Observable<boolean>;
  constructor(
    private facade: PartyFacade,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.userId$ = this.facade.userId$;
    this.party$ = this.facade.party$().pipe(
      tap((x) => {
        if (x.isRunning) {
          this.routerService.navigateToChat(x.id);
        }
      })
    );
    this.canStartParty$ = this.facade.canStartParty$();
  }

  onStartParty() {
    this.facade.beginParty();
  }
}
