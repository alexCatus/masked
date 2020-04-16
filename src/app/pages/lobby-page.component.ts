import { Component, OnInit } from '@angular/core';
import { SquareService } from '../services/square.service';
import { Square } from '../model/square.model';

@Component({
  selector: 'app-lobby-page',
  template: `
    <app-lobby
      [participants]="square.participants"
      [realName]="realName"
    ></app-lobby>
  `,
  styles: [],
})
export class LobbyPageComponent implements OnInit {
  realName: string;
  square: Square;
  constructor(private service: SquareService) {}

  ngOnInit() {
    this.realName = this.service.getName();
    this.square = this.service.getSquare();
  }
}
