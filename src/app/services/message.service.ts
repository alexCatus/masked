import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/party.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Observable<Message>;
  add(message: Message) {}
  load() {}
}
