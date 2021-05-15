import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JoinPartyData } from 'src/app/model/party.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @Output('joinExistingParty')
  joinExistingPartyEmitter: EventEmitter<JoinPartyData> = new EventEmitter<JoinPartyData>();
  @Output('createParty')
  createPartyEmitter: EventEmitter<string> = new EventEmitter<string>();

  formCreate: FormGroup = this.fb.group({
    userName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });
  formJoin: FormGroup = this.fb.group({
    userName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    partyId: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {}
  joinExistingParty() {
    if (this.formJoin.valid) {
      this.joinExistingPartyEmitter.emit(this.formJoin.value);
    }
  }
  createParty() {
    if (this.formCreate.valid) {
      this.createPartyEmitter.emit(this.formCreate.get('userName').value);
    }
  }
}
