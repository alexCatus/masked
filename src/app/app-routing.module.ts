import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { FaithPageComponent } from './pages/faith-page.component';
import { PartyPageComponent } from './pages/party-page.component';
import { ExistingPartyGuard } from './guards/existing-party.guard';
import { PartyNotInProgressGuard } from './guards/party-not-in-progress.guard';
import { PartyInProgressGuard } from './guards/party-in-progress.guard';
import { UserIsParticipantGuard } from './guards/user-is-participant.guard';

const routes: Routes = [
  {
    path: '',
    component: FaithPageComponent,
  },

  {
    path: 'party/:partyId',
    canActivate: [ExistingPartyGuard, UserIsParticipantGuard],
    children: [
      {
        canActivate: [PartyNotInProgressGuard],

        path: 'lobby',
        component: LobbyPageComponent,
      },
      {
        canActivate: [PartyInProgressGuard],
        path: 'chat',
        component: PartyPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
