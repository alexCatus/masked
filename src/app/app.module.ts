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
    AppRoutingModule,
    ReactiveFormsModule,
    StorageServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
