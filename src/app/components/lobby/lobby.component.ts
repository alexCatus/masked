import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WithId, Party } from '../../model/party.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Input()
  party: Party & WithId;
  @Input()
  userId: string;
  @Output('startParty')
  startPartyEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  startParty() {
    this.startPartyEmitter.emit(this.party.id);
  }
}
