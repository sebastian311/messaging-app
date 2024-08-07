import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebSocketService } from '../../data-access/services/web-socket.service';
import * as ChatActions from '../actions/chat-actions';
import { ChatRoomService } from '../../data-access/services/chatroom.service';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private webSocketService: WebSocketService,
    private chatRoomService: ChatRoomService
  ) {}

  // Outside CHATROOM
  fetchChatRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.fetchChatRooms),
      mergeMap(() =>
        this.chatRoomService.getChatRooms().pipe(
          map((chatRooms) => ChatActions.fetchChatRoomsSuccess({ chatRooms })),
          catchError((error) =>
            of(ChatActions.fetchChatRoomsFailure({ error }))
          )
        )
      )
    )
  );

  createChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.createChatRoom),
      mergeMap((action) =>
        this.chatRoomService.createChatRoom(action.name).pipe(
          map((chatRoom) => ChatActions.createChatRoomSuccess({ chatRoom })),
          catchError((error) =>
            of(ChatActions.createChatRoomFailure({ error }))
          )
        )
      )
    )
  );

  updateChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.updateChatRoom),
      mergeMap((action) =>
        this.chatRoomService.updateChatRoom(action.id, action.name).pipe(
          map((chatRoom) => ChatActions.updateChatRoomSuccess({ chatRoom })),
          catchError((error) =>
            of(ChatActions.updateChatRoomFailure({ error }))
          )
        )
      )
    )
  );

  deleteChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.deleteChatRoom),
      mergeMap((action) =>
        this.chatRoomService.deleteChatRoom(action.id).pipe(
          map(() => ChatActions.deleteChatRoomSuccess({ id: action.id })),
          catchError((error) =>
            of(ChatActions.deleteChatRoomFailure({ error }))
          )
        )
      )
    )
  );

  // Inside CHATROOM
  joinRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.joinRoom),
        tap((action) => {
          this.webSocketService.emit('joinRoom', { roomName: action.roomName });
        })
      ),
    { dispatch: false }
  );

  leaveRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.leaveRoom),
        tap((action) => {
          this.webSocketService.emit('leaveRoom', {
            roomName: action.roomName,
          });
        })
      ),
    { dispatch: false }
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.sendMessage),
        tap((action) => this.webSocketService.emit('message', action.message))
      ),
    { dispatch: false }
  );

  receiveMessage$ = createEffect(() =>
    this.webSocketService.listen('newMessage').pipe(
      map((message) => ChatActions.receiveMessage({ message })),
      catchError((error) => of(ChatActions.chatError({ error })))
    )
  );

  receiveError$ = createEffect(() =>
    this.webSocketService
      .listen('error')
      .pipe(map((error) => ChatActions.chatError({ error })))
  );
}
