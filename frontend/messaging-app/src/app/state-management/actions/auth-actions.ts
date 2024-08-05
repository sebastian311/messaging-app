import { createAction, props } from '@ngrx/store';
import { User } from '../../data-access/models/State';

// Actions for logging in
export const login = createAction(
  '[Login Component] Sign In',
  props<{ username: string; password: string}>()
);

export const loginSuccess = createAction(
  '[Login Component] Sign In Success',
  props<{ user: User; token: string }>()
);

export const loginFail = createAction(
  '[Login Component] Sign In Fail',
  props<{ errorMessage: string }>()
);

// Actions for registering
export const register = createAction(
  '[Register Component] Sign Up',
  props<{ username: string; password: string}>()
);

export const registerSuccess = createAction(
  '[Register Component] Sign Up Success',
  props<{ user: User; token: string }>()
);

export const registerFail = createAction(
  '[Register Component] Sign Up Fail',
  props<{ errorMessage: string }>()
);

// Action for logging out
export const logout = createAction('[Logout Component] Sign Off');
