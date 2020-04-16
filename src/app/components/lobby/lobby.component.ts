import { Component, OnInit, Input } from '@angular/core';
import { Participant, WithId } from '../../model/square.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Input()
  participants: (Participant & WithId)[] = [];

  @Input()
  realName: string;

  constructor() {
    console.log(this.participants);
  }

  ngOnInit() {}

  joinTheGame() {}
}
