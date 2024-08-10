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
    console.log("User is joining room from client side with: ", roomName, ", ", username);
    setTimeout(() => this.webSocket.emit('joinRoom', { roomName, username }), 100);
    
  }

  sendMessage(roomName: string, user: string, text: string) {
    this.webSocket.emit('sendMessage', { roomName, user, text });
  }

  getMessages(): Observable<any> {
    return this.webSocket.fromEvent('message');
  }

  disconnect() {
    this.webSocket.disconnect();
  }
}
