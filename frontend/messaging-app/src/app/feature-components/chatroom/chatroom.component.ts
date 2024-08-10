import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentRoom } from '../../state-management/selectors/chatroom-selectors';
import { AppState } from '../../state-management/reducers';
import {
  filter,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { ChatRoom } from '../../data-access/models/Chatroom';
import { WebSocketService } from '../../data-access/services/web-socket.service';

interface Message {
  isSelf: boolean;
  username: string;
  timestamp: string;
  status: string;
  content: string;
}

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  chatroomData$ = new Observable<ChatRoom | undefined>();
  user = JSON.parse(localStorage.getItem('user') || '');

  routerSub!: Subscription;
  messageSubscription!: Subscription;

  messages: Message[] = [];

  newMessage = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    this.chatroomData$ = this.store.select(selectCurrentRoom);
  }

  ngOnInit(): void {
    // I think I messed up the backend connection, but we need this before joining the room.
    this.webSocketService.connect();

    this.chatroomData$
      .pipe(
        take(1),
        tap((chatroom) => {          
          if (!chatroom || !this.user) {
            this.goBack(); // Redirect if data is missing
            return;
          }
          // Connect to chat room via Web Socket
          this.webSocketService.joinRoom(chatroom.name, this.user.username);
        })
      )
      .subscribe();

    // On route change (either from clicking 'Back' or from manual link insertion)
    this.routerSub = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.webSocketService.disconnect();
      });

    this.messageSubscription = this.webSocketService
      .getMessages()
      .subscribe((message) => {
        if (message.user !== this.user.username) {
          this.messages.push({
            isSelf: false,
            username: message.user,
            timestamp: message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : '',
            status: 'Unknown', // TODO: Get user status. Might need a BE refactor.
            content: message.text,
          });

          this.scrollToBottom();
        }

      });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if(this.chatContainer?.nativeElement)
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }

  goBack() {
    this.router.navigate(['']);
  }

  sendMessage(chatroom: ChatRoom) {
    if (this.newMessage.trim()) {
      const roomName = chatroom.name;

      // Update local messages array for immediate UI update
      this.messages.push({
        isSelf: true,
        username: 'You',
        timestamp: new Date().toLocaleTimeString(),
        status: 'Online',
        content: this.newMessage.trim(),
      });

      // Send the message over the WebSocket
      this.webSocketService.sendMessage(
        roomName,
        this.user.username,
        this.newMessage.trim()
      );
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    this.routerSub?.unsubscribe();
  }
}
