import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChatRoom } from '../../data-access/models/Chatroom';
import {
  selectChatRooms,
  selectIsLoading,
} from '../../state-management/selectors/chatroom-selectors';
import { AppState } from '../../state-management/reducers';
import * as ChatActions from '../../state-management/actions/chat-actions';

@Component({
  selector: 'app-chatroom-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatroom-list.component.html',
  styleUrl: './chatroom-list.component.scss',
})
export class ChatroomListComponent {
  chatRooms$: Observable<ChatRoom[]>;
  isLoading$: Observable<boolean | undefined>;

  constructor(private store: Store<AppState>) {
    this.chatRooms$ = this.store.pipe(select(selectChatRooms));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(ChatActions.fetchChatRooms());
  }

  createChatRoom(name: string): void {
    if (name) {
      this.store.dispatch(ChatActions.createChatRoom({ name }));
    }
  }

  updateChatRoom(id: number | undefined, newName: string): void {
    if (id && newName) {
      this.store.dispatch(ChatActions.updateChatRoom({ id, name: newName }));
    }
  }

  deleteChatRoom(id: number | undefined): void {
    if (id) {
      this.store.dispatch(ChatActions.deleteChatRoom({ id }));
    }
  }
}
