import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { LandingPageComponent } from './pages/landing-page.component';
import { PartyPageComponent } from './pages/party-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game',
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    component: LandingPageComponent,
    children: [
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
    ],
  },
  {
    path: 'private',
    canActivate: [NotAuthGuard],
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
