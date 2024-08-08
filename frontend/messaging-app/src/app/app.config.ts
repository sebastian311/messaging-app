import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { Action, MetaReducer, provideStore } from '@ngrx/store';
import { reducers, AppState } from './state-management/reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state-management/effects/auth.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChatEffects } from './state-management/effects/chat.effects';

export const metaReducers: MetaReducer<AppState, Action>[] = isDevMode()
  ? []
  : [];

const socketConfig: SocketIoConfig = { url: 'http://localhost:5000', options: {} };  

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects, ChatEffects]),
    importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
    provideHttpClient(withFetch())
  ],
};
