import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { PartyService } from './services/party.service';

@Injectable({
  providedIn: 'root',
})
export class ExistingPartyGuard implements CanActivate {
  constructor(private service: PartyService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.service.joinExistingParty(next.params['partyId'])
      ? true
      : this.router.createUrlTree(['']);
  }
}
