// chatroom.model.ts
export interface ChatRoom {
  id?: number;
  name: string;
  messages?: Message[];
}

export interface Message {
  chatRoomId: string | null;
  user: string;
  text: string;
  timestamp?: string | undefined;
}
