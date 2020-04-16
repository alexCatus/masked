import { Component, OnInit } from '@angular/core';
import { SquareService } from '../services/square.service';
import { Router } from '@angular/router';
import { JoinSquareData } from '../model/square.model';

@Component({
  selector: 'app-faith-page',
  template: `
    <app-choose-your-faith
      (joinExistingSquare)="onJoinExistingSquare($event)"
      (createSquare)="onCreateSquare($event)"
    ></app-choose-your-faith>
  `,
  styles: [],
})
export class FaithPageComponent implements OnInit {
  constructor(private service: SquareService, private router: Router) {}
  ngOnInit() {}
  onJoinExistingSquare(data: JoinSquareData) {
    console.log('là');
    this.service.joinExistingSquare(data);
    console.log(data);
    this.router.navigate(['/square/' + data.squareId]);
  }
  onCreateSquare(realName: string) {
    const squareId = this.service.createSquare(realName);
    this.router.navigate(['/square/' + squareId]);
  }
}
