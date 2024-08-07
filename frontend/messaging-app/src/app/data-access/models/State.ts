import { ChatRoom, Message } from "./Chatroom";


export interface AuthState {
    isLogged: boolean;
    user: User | null;
    isLoading: boolean;
  }
  
  export interface UIState {
    isLoading: boolean;
  }
  
  export interface UsersState {
    users: User[];
    error: string | null;
  }
  
  export interface ChatState {
    isLoading: boolean | undefined;
    chatRooms: ChatRoom[];
    selectedRoomId: string | undefined;
    messages: Message[];
    error: string | null;
  }
  
  export interface User {
    id: string;
    username: string;
    online: boolean;
  }