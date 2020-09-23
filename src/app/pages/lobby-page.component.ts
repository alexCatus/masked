import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Party, WithId } from '../model/party.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lobby-page',
  template: `
    <app-lobby
      [party]="party$ | async"
      [userId]="userId$ | async"
      (startParty)="onStartParty($event)"
    ></app-lobby>
  `,
  styles: [],
})
export class LobbyPageComponent implements OnInit {
  userId$: Observable<string>;
  party$: Observable<Party & WithId>;
  constructor(private service: PartyService, private router: Router) {}

  ngOnInit() {
    this.userId$ = this.service.userId$;
    this.party$ = this.service.party$;
  }

  onStartParty(partyId: string) {
    this.service.beginParty(partyId);
    this.router.navigate(['/party', partyId]);
  }
}
