import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Party, WithId, Message, Participant } from 'src/app/model/party.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {
  @Input()
  party: Party & WithId;
  @Input()
  userId: string;

  form: FormGroup = this.fb.group({
    //name is required, min leng 3 char
    //TODO : should be uniq in the room
    message: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });

  @Output('sendMessage')
  sendMessageEmitter: EventEmitter<{
    message: Message;
    partyId: string;
  }> = new EventEmitter<{
    message: Message;
    partyId: string;
  }>();
  @Output('stopParty')
  stopPartyEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  sendMessage() {
    const message: string = this.form.get('message').value as string;
    this.sendMessageEmitter.emit({
      message: {
        userId: this.userId,
        falseName: this.party.participants[this.userId].falseName,
        realName: this.party.participants[this.userId].realName,
        message: message,
        sentOn: new Date(Date.now()),
      },
      partyId: this.party.id,
    });
    this.form.reset();
  }
  stopParty() {
    this.stopPartyEmitter.emit(this.party.id);
  }
}
