import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Component] Sign In',
  props<{ user: any; token: string }>()
);
export const loginSuccess = createAction(
  '[Login Component] Sign In Success',
  props<{ user: any; token: string }>()
);
export const loginFail = createAction(
  '[Login Component] Sign In Fail',
  props<{ errorMessage: string }>()
);

export const register = createAction(
  '[Register Component] Sign Up',
  props<{ user: any; token: string }>()
);
export const registerSuccess = createAction(
  '[Register Component] Sign Up Success',
  props<{ user: any; token: string }>()
);
export const registerFail = createAction(
  '[Register Component] Sign Up Fail',
  props<{ errorMessage: string }>()
);

export const logout = createAction('[Logout Component] Sign Off');
