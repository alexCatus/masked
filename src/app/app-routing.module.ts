import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { LandingPageComponent } from './pages/landing-page.component';
import { PartyPageComponent } from './pages/party-page.component';
import { NotAuthComponent } from './pages/auth/not-auth.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/not-loggued.guard copy';
import { AuthPageComponent } from './pages/auth-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'game/', pathMatch: 'full' },
  { path: 'game', redirectTo: 'game/', pathMatch: 'full' },
  {
    path: 'game/:gameId',
    canActivate: [AuthGuard],
    component: AuthPageComponent,
  },
  {
    path: 'private',
    canActivate: [NotAuthGuard],
    component: NotAuthComponent,
  },
  {
    path: '***',
    pathMatch: 'full',
    redirectTo: 'game/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
