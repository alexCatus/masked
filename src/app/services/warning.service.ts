import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  constructor() {}
  display(warning: string) {
    console.log({ warning: warning });
  }
}
