import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { LandingPageComponent } from './pages/landing-page.component';
import { PartyComponent } from './components/party/party.component';
import { PartyPageComponent } from './pages/party-page.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LobbyComponent,
    LobbyPageComponent,
    LandingPageComponent,
    PartyComponent,
    PartyPageComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'masked'),
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ClipboardModule,
    HttpClientModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
