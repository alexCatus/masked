import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { LandingPageComponent } from './pages/landing-page.component';
import { PartyPageComponent } from './pages/party-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    // canActivate: [PartyNotInProgressGuard],
    path: 'lobby',
    component: LobbyPageComponent,
  },
  {
    // canActivate: [PartyInProgressGuard],
    path: 'party',
    component: PartyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
