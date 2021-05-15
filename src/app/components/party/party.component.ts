import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Party, WithId, Message, Participant } from 'src/app/model/party.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

export interface PartyComponentInfo {
  party: Party;
  user: Participant;
  trueParticipants: any;
  falseParticipants: any;
}
@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {
  @Input()
  set partyInfo(value: PartyComponentInfo) {
    this.trueParticipants = value.trueParticipants;
    this.falseParticipants = value.falseParticipants;
    this.user = value.user;
    this.party = value.party;
  }
  @Input()
  trueParticipants;
  @Input()
  falseParticipants;
  @Input()
  party: Party;
  @Input()
  userId: string;
  @Input()
  user: Participant;
  @Input()
  messages: Message[];

  form: FormGroup = this.fb.group({
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
    // const message: string = this.form.get('message').value as string;
    // this.sendMessageEmitter.emit({
    //   message: {
    //     userId: this.userId,
    //     falseName: this.party.participants[this.userId].falseName,
    //     realName: this.party.participants[this.userId].realName,
    //     message: message,
    //     sentOn: new Date(Date.now()),
    //   },
    //   partyId: this.party.id,
    // });
    // this.form.reset();
  }
  stopParty() {
    this.stopPartyEmitter.emit(this.party.id);
  }
}
