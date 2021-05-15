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
export class ExistingPartyGuard implements CanActivate {
  constructor(
    private partyFacade: PartyFacade,
    private warningService: WarningService,
    private routerService: RouterService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(true);
    // return this.partyFacade.partyExists().pipe(
    //   map((party) => {
    //     if (!!party) {
    //       return true;
    //     }
    //     this.warningService.display('partyDontExist');
    //     return this.routerService.goToHome('');
    //   })
    // );
  }
}
