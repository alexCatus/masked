import { Injectable, Inject } from '@angular/core';
import { JoinSquareData, Square } from '../model/square.model';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class SquareService {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  createSquare(userName: string): string {
    this.storage.set('userName', userName);
    const squareId = 'newSquareId' + Math.random().toString();
    this.storage.set('squareId', squareId);
    return squareId;
  }
  joinExistingSquare(data: JoinSquareData) {
    this.storage.set('squareId', data.squareId);
    this.storage.set('userName', data.userName);
  }

  getName(): string {
    console.log(this.storage.get('userName'));
    return this.storage.get('userName');
  }

  getSquareId(): string {
    console.log(this.storage.get('squareId'));
    return this.storage.get('squareId');
  }

  getSquare(): Square {
    return {
      participants: [
        {
          realName: this.getName(),
          falseName: null,
        },
        {
          realName: 'Natasha',
          falseName: null,
        },
        {
          realName: 'Joanie',
          falseName: null,
        },
        {
          realName: 'Sarah',
          falseName: null,
        },
      ],
    };
  }
}
