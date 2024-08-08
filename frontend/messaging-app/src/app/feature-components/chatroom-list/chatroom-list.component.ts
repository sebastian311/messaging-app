import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { loadChatRoom } from '../../state-management/actions/chat-actions';

@Component({
  selector: 'app-chatroom-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chatroom-list.component.html',
  styleUrl: './chatroom-list.component.scss',
})
export class ChatroomListComponent {
  chatRooms$: Observable<ChatRoom[]>;
  isLoading$: Observable<boolean | undefined>;

  constructor(private store: Store<AppState>, private router: Router) {
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
  
  navigateToRoom(room: ChatRoom): void {
    if (room.id) {
      this.store.dispatch(loadChatRoom({ id: room.id }));
    } else {
      alert("Error. Could not load chat room. Please try again!")
    }
  }

  deleteChatRoom(id: number | undefined): void {
    if (id) {
      this.store.dispatch(ChatActions.deleteChatRoom({ id }));
    }
  }
}
