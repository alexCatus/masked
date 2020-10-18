import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}
  goToHome(partyId: string): UrlTree {
    return this.router.createUrlTree(['']);
  }
  goToLobby(partyId: string): UrlTree {
    return this.router.createUrlTree(['']);
  }
  goToChat(partyId: string): UrlTree {
    return this.router.createUrlTree(['']);
  }

  navigateToHome(partyId: string) {
    this.router.navigate(['/']);
  }
  navigateToLobby(partyId: string) {
    this.router.navigate(['/', 'party', partyId, 'lobby']);
  }
  navigateToChat(partyId: string) {
    this.router.navigate(['/', 'party', partyId, 'chat']);
  }
}
