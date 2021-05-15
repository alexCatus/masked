import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartyFacade } from '../services/party.facade';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root',
})
export class PartyNotInProgressGuard implements CanActivate {
  constructor(
    private partyFacade: PartyFacade,
    private routerService: RouterService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.partyFacade.party$.pipe(
      map((party) => {
        if (!party.isRunning) {
          return true;
        }
        return this.routerService.goToChat(party.id);
      })
    );
  }
}
