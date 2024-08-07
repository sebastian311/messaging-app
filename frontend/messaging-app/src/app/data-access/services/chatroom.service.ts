import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoom } from '../models/Chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private apiUrl = 'http://localhost:5000/api/chatrooms';

  constructor(private http: HttpClient) {}

  getChatRooms(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(this.apiUrl);
  }

  getChatRoom(id: number): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(`${this.apiUrl}/${id}`);
  }

  createChatRoom(name: string): Observable<ChatRoom> {
    return this.http.post<ChatRoom>(this.apiUrl, { name });
  }

  updateChatRoom(id: number, name: string): Observable<ChatRoom> {
    return this.http.put<ChatRoom>(`${this.apiUrl}/${id}`, { name });
  }

  deleteChatRoom(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
