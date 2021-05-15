import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  constructor() {}
  display(message: string, error: string) {
    // console.warn(message, error);
  }
}
