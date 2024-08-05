import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { AuthState, ChatState, UIState, UsersState } from '../../data-access/models/State';
import { login, logout, register } from '../actions/auth-actions';

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
  on(login, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null,
  })),
  on(register, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    token: null,
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