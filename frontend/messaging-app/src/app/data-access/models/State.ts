

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
    chatRooms: ChatRoom[];
    selectedRoomId: string | null;
    messages: Message[];
    error: string | null;
  }
  
  export interface User {
    id: string;
    username: string;
    online: boolean;
  }
  
  export interface ChatRoom {
    id: string;
    name: string;
    messages: Message[];
  }
  
  export interface Message {
    id: string;
    userId: string;
    text: string;
    timestamp: Date;
  }