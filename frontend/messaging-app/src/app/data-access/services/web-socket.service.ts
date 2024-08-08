import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: Socket;

  constructor() {
    this.webSocket = new Socket({
      url: 'http://localhost:5000',
      options: {},
    });
  }

  public listen(eventName: string): Observable<any> {
    return this.webSocket.fromEvent(eventName);
  }

  connect() {
    this.webSocket.connect();
  }

  joinRoom(roomName: string, username: string) {
    this.webSocket.emit('joinRoom', { roomName, username });
  }

  sendMessage(roomName: string, user: string, text: string) {
    this.webSocket.emit('sendMessage', { roomName, user, text });
  }

  disconnect() {
    this.webSocket.disconnect();
  }
}
