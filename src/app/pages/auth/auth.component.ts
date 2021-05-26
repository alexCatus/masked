import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: [, Validators.required],
    password: [, Validators.required],
  });

  constructor(private fb: FormBuilder, private service: AuthService) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.form.valid) {
      this.service.signIn(this.form.value.email, this.form.value.password);
    }
    this.form.markAllAsTouched();
  }
}
