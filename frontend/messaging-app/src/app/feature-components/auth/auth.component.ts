import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, register } from '../../state-management/actions/auth-actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  form: FormGroup;
  registerPage = false;

  constructor(private store: Store) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.registerPage) {
      this.store.dispatch(register(this.form.value))
      this.registerPage = false;
    } else {
      this.store.dispatch(login(this.form.value))
    }
  }
}