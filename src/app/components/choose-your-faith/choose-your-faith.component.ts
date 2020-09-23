import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JoinPartyData } from 'src/app/model/party.model';

@Component({
  selector: 'app-choose-your-faith',
  templateUrl: './choose-your-faith.component.html',
  styleUrls: ['./choose-your-faith.component.scss'],
})
export class ChooseYourFaithComponent implements OnInit {
  @Output('joinExistingParty')
  joinExistingPartyEmitter: EventEmitter<JoinPartyData> = new EventEmitter<
    JoinPartyData
  >();
  @Output('createParty')
  createPartyEmitter: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup = this.fb.group({
    //name is required, min leng 3 char
    //TODO : should be uniq in the room
    realName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    partyId: [''],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {}
  joinExistingParty() {
    this.joinExistingPartyEmitter.emit({
      partyId: this.form.get('partyId').value,
      userName: this.form.get('realName').value,
    });
  }
  createParty() {
    this.createPartyEmitter.emit(this.form.get('realName').value);
  }
}
