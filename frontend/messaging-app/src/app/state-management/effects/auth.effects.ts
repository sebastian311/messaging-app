import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import * as AuthActions from '../actions/auth-actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) => {
            if (response.token) {
              localStorage.setItem('token', response.token);
              this.router.navigateByUrl("/chatrooms")
              
              return AuthActions.loginSuccess({
                user: {
                  username: action.username,
                  id: '',
                  online: false
                },
                token: response.token,
              });
            } else {
              return AuthActions.loginFail({
                errorMessage: 'No token received',
              });
            }
          }),
          catchError((error) =>
            of(AuthActions.loginFail({ errorMessage: error.message || 'Login Failed' }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(action.username, action.password).pipe(
          map((response) => {
            if (response.token) {
              return AuthActions.registerSuccess({
                user: {
                  username: action.username,
                  id: '',
                  online: false
                },
                token: response.token,
              });
            } else {
              return AuthActions.registerFail({
                errorMessage: 'No token received',
              });
            }
          }),
          catchError((error) =>
            of(AuthActions.registerFail({ errorMessage: error.message || 'Registration Failed' }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );
}
