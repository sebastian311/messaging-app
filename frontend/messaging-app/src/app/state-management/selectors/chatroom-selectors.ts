import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from '../../data-access/models/State';
import { AppState } from '../reducers';

// Feature selector for chat module
export const selectChatFeature = createFeatureSelector<AppState, ChatState>('chat');

export const selectChatRooms = createSelector(
  selectChatFeature,
  (state: ChatState) => state.chatRooms
);

export const selectRoomMessages = createSelector(
  selectChatFeature,
  (state: ChatState) => state.messages.filter(message => message.chatRoomId === state.selectedRoomId)
);

export const selectCurrentRoom = createSelector(
  selectChatFeature,
  (state: ChatState) => state.chatRooms.find(room => room.id === state.selectedRoomId)
);

export const selectIsLoading = createSelector(
  selectChatFeature,
  (state: ChatState) => state.isLoading
);
