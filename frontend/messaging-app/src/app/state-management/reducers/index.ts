import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
  State,
} from '@ngrx/store';
import {
  AuthState,
  ChatState,
  UIState,
  UsersState,
} from '../../data-access/models/State';
import * as AuthActions from '../actions/auth-actions';
import * as ChatActions from '../actions/chat-actions';

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
  isLoading: false,
  error: null
};

const initialUIState: UIState = {
  isLoading: false,
};

const initialUsersState: UsersState = {
  // Define your initial users state properties
  users: [],
  error: null,
};

const initialChatState: ChatState = {
  chatRooms: [],
  selectedRoom: undefined,
  messages: [],
  error: null,
  isLoading: undefined
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
  initialUIState,
  on(ChatActions.fetchChatRooms, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ChatActions.fetchChatRoomsSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ChatActions.fetchChatRoomsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ChatActions.createChatRoom, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ChatActions.createChatRoomSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ChatActions.createChatRoomFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

const usersReducer = createReducer(
  initialUsersState
  // Users actions here TBI (like, modify avatar etc)
);

const chatReducer = createReducer(
  initialChatState,
  on(ChatActions.fetchChatRoomsSuccess, (state, { chatRooms }) => ({
    ...state,
    chatRooms,
    error: null,
  })),
  on(ChatActions.fetchChatRoomsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ChatActions.createChatRoomSuccess, (state, { chatRoom }) => ({
    ...state,
    chatRooms: [...state.chatRooms, chatRoom],
    error: null,
  })),
  on(ChatActions.createChatRoomFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ChatActions.loadChatRoomSuccess, (state, { chatRoom }) => ({
    ...state,
    selectedRoom: chatRoom,
    error: null,
  })),
  on(ChatActions.loadChatRoomFailure, (state, { error }) => ({
    ...state,
    selectedRoom: undefined,
    error,
  })),
  on(ChatActions.updateChatRoomSuccess, (state, { chatRoom }) => ({
    ...state,
    chatRooms: state.chatRooms.map((room) =>
      room.id === chatRoom.id ? chatRoom : room
    ),
    error: null,
  })),
  on(ChatActions.updateChatRoomFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ChatActions.deleteChatRoomSuccess, (state, { id }) => ({
    ...state,
    chatRooms: state.chatRooms.filter((room) => room.id !== id),
    error: null,
  })),
  on(ChatActions.deleteChatRoomFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ChatActions.receiveMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    error: null,
  })),
  on(ChatActions.chatError, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  users: usersReducer,
  chat: chatReducer,
};

export const metaReducers: MetaReducer<State<AppState>>[] = isDevMode()
  ? []
  : [];
