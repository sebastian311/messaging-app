import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { login, register } from '../../state-management/actions/auth-actions';
import { selectAuthError } from '../../state-management/selectors/auth-selectors';

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
  errorMessage$: Observable<string | null>;

  constructor(private store: Store) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.errorMessage$ = this.store.select(selectAuthError as any);
  }
  
  submit() {
    if (this.registerPage) {
      this.store.dispatch(register(this.form.value))
      this.registerPage = false;
      this.errorMessage$ = of(null);
    } else {
      this.store.dispatch(login(this.form.value))
    }
  }
}