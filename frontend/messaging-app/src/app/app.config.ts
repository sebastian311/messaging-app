import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { Action, MetaReducer, provideStore } from '@ngrx/store';
import { reducers, AppState } from './state-management/reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state-management/effects/auth.effects';
import { provideHttpClient } from '@angular/common/http';

export const metaReducers: MetaReducer<AppState, Action>[] = isDevMode()
  ? []
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects(AuthEffects),
    provideHttpClient()
  ],
};
