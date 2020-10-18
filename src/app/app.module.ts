import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseYourFaithComponent } from './components/choose-your-faith/choose-your-faith.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyPageComponent } from './pages/lobby-page.component';
import { FaithPageComponent } from './pages/faith-page.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { PartyComponent } from './components/party/party.component';
import { PartyPageComponent } from './pages/party-page.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClipboardModule } from '@angular/cdk/clipboard';
@NgModule({
  declarations: [
    AppComponent,
    ChooseYourFaithComponent,
    LobbyComponent,
    LobbyPageComponent,
    FaithPageComponent,
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
    StorageServiceModule,
    ClipboardModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
