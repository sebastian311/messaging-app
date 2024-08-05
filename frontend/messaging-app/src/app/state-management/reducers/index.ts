import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { AuthState, ChatState, UIState, UsersState } from '../../data-access/models/State';
import * as AuthActions from '../actions/auth-actions'
// Configuration:

export interface AppState {
  auth: AuthState;
  ui: UIState;
  users: UsersState;
  chat: ChatState;
}

const initialAuthState: AuthState = {
  user: null,
  isLogged: false,
  isLoading: false
};

const initialUIState: UIState = {
  isLoading: false
};

const initialUsersState: UsersState = {
  // Define your initial users state properties
  users: [],
  error: null,
};

const initialChatState: ChatState = {
  chatRooms: [],
  selectedRoomId: null,
  messages: [],
  error: null
};

// Implementation of all REDUCERS:

const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isLogged: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null,
  })),
  on(AuthActions.loginFail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
    user: null,
    token: null,
  })),
  on(AuthActions.registerFail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
    user: null,
    token: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    isLogged: false,
    error: null,
  }))
);

const uiReducer = createReducer(
  initialUIState
  // UI actions here
);

const usersReducer = createReducer(
  initialUsersState
  // Users actions here
);

const chatReducer = createReducer(
  initialChatState
  // Chat actions here
);

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,  
  ui: uiReducer,      
  users: usersReducer,
  chat: chatReducer   
};

export const metaReducers: MetaReducer<State<AppState>>[] = isDevMode() ? [] : [];