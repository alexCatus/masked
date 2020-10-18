import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
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
    private warningService: WarningService,
    private routerService: RouterService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.partyFacade.party$().pipe(
      map((party) => {
        console.log({ isRunning: party.isRunning });
        if (party.isRunning) {
          return true;
        }
        this.warningService.display('party in progress');

        return this.routerService.goToLobby(party.id);
      })
    );
  }
}
