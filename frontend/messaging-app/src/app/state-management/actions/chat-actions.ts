import { createAction, props } from '@ngrx/store';
import { ChatRoom } from '../../data-access/models/Chatroom';

// Action to join a chat room
export const joinRoom = createAction(
  '[Chat Component] Join Room',
  props<{ roomName: string }>()
);

// Action to leave a chat room
export const leaveRoom = createAction(
  '[Chat Component] Leave Room',
  props<{ roomName: string }>()
);

// Action for sending a message
export const sendMessage = createAction(
  '[Chat Component] Send Message',
  props<{ message: { roomName: string; user: string; text: string } }>()
);

// Action for receiving a message
export const receiveMessage = createAction(
  '[Chat API] Receive Message',
  props<{
    message: {
      chatRoomId: string;
      user: string;
      text: string;
      timestamp?: string;
    };
  }>()
);

// Action for chat errors
export const chatError = createAction(
  '[Chat API] Error',
  props<{ error: any }>()
);

// Action for fetching chatrooms
export const fetchChatRooms = createAction('[Chat Room List] Fetch Chat Rooms');
export const fetchChatRoomsSuccess = createAction(
  '[Chat API] Fetch Chat Rooms Success',
  props<{ chatRooms: ChatRoom[] }>()
);
export const fetchChatRoomsFailure = createAction(
  '[Chat API] Fetch Chat Rooms Failure',
  props<{ error: any }>()
);

// Action to load a specific chat room by ID
export const loadChatRoom = createAction(
  '[Chat API] Load Chat Room',
  props<{ id: number }>()
);

export const loadChatRoomSuccess = createAction(
  '[Chat API] Load Chat Room Success',
  props<{ chatRoom: ChatRoom }>()
);

export const loadChatRoomFailure = createAction(
  '[Chat API] Load Chat Room Failure',
  props<{ error: any }>()
);

// Action for creating chatrooms
export const createChatRoom = createAction(
  '[Chat Room List] Create Chat Room',
  props<{ name: string }>()
);
export const createChatRoomSuccess = createAction(
  '[Chat API] Create Chat Room Success',
  props<{ chatRoom: ChatRoom }>()
);
export const createChatRoomFailure = createAction(
  '[Chat API] Create Chat Room Failure',
  props<{ error: any }>()
);

// Action for updating chatrooms
export const updateChatRoom = createAction(
  '[Chat Room List] Update Chat Room',
  props<{ id: number; name: string }>()
);
export const updateChatRoomSuccess = createAction(
  '[Chat API] Update Chat Room Success',
  props<{ chatRoom: ChatRoom }>()
);
export const updateChatRoomFailure = createAction(
  '[Chat API] Update Chat Room Failure',
  props<{ error: any }>()
);

// Action for deleting chatrooms
export const deleteChatRoom = createAction(
  '[Chat Room List] Delete Chat Room',
  props<{ id: number }>()
);
export const deleteChatRoomSuccess = createAction(
  '[Chat API] Delete Chat Room Success',
  props<{ id: number }>()
);
export const deleteChatRoomFailure = createAction(
  '[Chat API] Delete Chat Room Failure',
  props<{ error: any }>()
);
