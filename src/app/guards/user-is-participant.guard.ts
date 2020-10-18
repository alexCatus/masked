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
export class UserIsParticipantGuard implements CanActivate {
  constructor(
    private partyFacade: PartyFacade,
    private warningService: WarningService,
    private routerService: RouterService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.partyFacade.isCurrentUserParticipant$().pipe(
      map((isCurrentUserParticipant) => {
        if (isCurrentUserParticipant) {
          return true;
        }
        console.log({ isCurrentUserParticipant: isCurrentUserParticipant });
        this.warningService.display('user not participant');
        return this.routerService.goToHome('');
      })
    );
  }
}
