import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentRoom } from '../../state-management/selectors/chatroom-selectors';
import { AppState } from '../../state-management/reducers';
import { Observable, take, tap } from 'rxjs';
import { ChatRoom } from '../../data-access/models/Chatroom';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent implements OnInit{
  chatroomData$ = new Observable<ChatRoom | undefined>

  messages = [
    {
      isSelf: true,
      username: 'You',
      timestamp: '10:16 AM',
      status: 'Online',
      content: "I'm good, thanks! What about you?",
    },
    {
      isSelf: false,
      username: 'Alice',
      timestamp: '10:15 AM',
      status: 'Online',
      content: 'Hello, how are you?',
    },
  ];

  newMessage = '';

  constructor(private store: Store<AppState>, private router: Router) {
    this.chatroomData$ = this.store.select(selectCurrentRoom);
  }

  ngOnInit(): void {
    this.chatroomData$.pipe(take(1)).subscribe(chatroom => chatroom ?? this.goBack());
  }

  goBack() {
    this.router.navigate(['']);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        isSelf: true,
        username: 'You',
        timestamp: new Date().toLocaleTimeString(),
        status: 'Online',
        content: this.newMessage.trim(),
      });
      this.newMessage = '';
    }
  }
}
