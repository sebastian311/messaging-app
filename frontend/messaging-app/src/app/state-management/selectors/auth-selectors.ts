import { createSelector } from '@ngrx/store';
import { AuthState } from '../../data-access/models/State';
import { AppState } from '../reducers';

export const selectAuthState = (state: AppState) => state.auth;

export const selectIsLogged = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLogged
);
