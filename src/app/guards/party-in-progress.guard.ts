import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartyFacade } from '../services/party.facade';
import { RouterService } from '../services/router.service';
import { WarningService } from '../services/warning.service';

@Injectable({
  providedIn: 'root',
})
export class PartyInProgressGuard implements CanActivate {
  constructor(
    private partyFacade: PartyFacade,
    private routerService: RouterService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(true);
    // return this.partyFacade.partyId$.pipe(
    //   map((party) => {
    //     console.log({ isRunning: party. });
    //     if (party.isRunning) {
    //       return false;
    //     }
    //     return this.routerService.goToLobby(party.id);
    //   })
    // );
  }
}
