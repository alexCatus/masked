import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { FaithPageComponent } from './pages/faith-page.component';
import { PartyPageComponent } from './pages/party-page.component';
import { ExistingPartyGuard } from './existing-party.guard';

const routes: Routes = [
  {
    path: '',
    component: FaithPageComponent,
  },
  {
    //If no party go to FaithPage
    //If party is running go to party
    canActivate: [ExistingPartyGuard],
    path: 'lobby/:partyId',
    component: LobbyPageComponent,
  },
  {
    //If no party go to FaithPage
    canActivate: [ExistingPartyGuard],
    //add guard to check if party has begun, otherwise, go to lobby
    path: 'party/:partyId',
    component: PartyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
