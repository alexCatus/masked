import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  id = 0;
  createId(): string {
    return (++this.id).toString();
  }
}
