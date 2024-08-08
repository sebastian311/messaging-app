import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from '../../data-access/models/State';
import { AppState } from '../reducers';

// Feature selector for chat module
export const selectChatFeature = (state: AppState) => state.chat;

export const selectChatRooms = createSelector(
  selectChatFeature,
  (state: ChatState) => state.chatRooms
);

export const selectCurrentRoom = createSelector(
  selectChatFeature,
  (state: ChatState) => state.chatRooms.find(room => room.id === state.selectedRoom?.id)
);

export const selectIsLoading = createSelector(
  selectChatFeature,
  (state: ChatState) => state.isLoading
);
