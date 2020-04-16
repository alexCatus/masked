import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JoinSquareData } from 'src/app/model/square.model';

@Component({
  selector: 'app-choose-your-faith',
  templateUrl: './choose-your-faith.component.html',
  styleUrls: ['./choose-your-faith.component.scss'],
})
export class ChooseYourFaithComponent implements OnInit {
  @Output('joinExistingSquare')
  joinExistingSquareEmitter: EventEmitter<JoinSquareData> = new EventEmitter<
    JoinSquareData
  >();
  @Output('createSquare')
  createSquareEmitter: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup = this.fb.group({
    realName: ['', Validators.required],
    squareId: [''],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {}
  joinExistingSquare() {
    console.log('ici');
    this.joinExistingSquareEmitter.emit({
      squareId: this.form.get('squareId').value,
      userName: this.form.get('realName').value,
    });
  }
  createSquare() {
    this.createSquareEmitter.emit(this.form.get('realName').value);
  }
}
