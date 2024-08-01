import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Component] Sign In',
  props<{ user: any; token: string }>()
);

export const register = createAction(
  '[Register Component] Sign Up',
  props<{ user: any; token: string }>()
);

export const logout = createAction('[Logout Component] Sign Off');
