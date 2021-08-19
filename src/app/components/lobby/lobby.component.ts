import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WithId, Party } from '../../model/party.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Input()
  party: Party;
  @Input()
  currentUrl: string;

  @Input()
  userId: string;
  @Input()
  canStartParty: boolean;
  @Output('startParty')
  startPartyEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  startParty() {
    this.startPartyEmitter.emit();
  }
}
