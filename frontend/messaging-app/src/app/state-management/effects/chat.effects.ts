import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { tap, mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebSocketService } from '../../data-access/services/web-socket.service';
import * as ChatActions from '../actions/chat-actions';
import { ChatRoomService } from '../../data-access/services/chatroom.service';
import { AppState } from '../reducers';
import { selectUser } from '../selectors/auth-selectors';
import { Router } from '@angular/router';

@Injectable()
export class ChatEffects {
  // private webSocketService: WebSocketService = Inject(WebSocketService);

  constructor(
    private actions$: Actions,
    // private webSocketService: WebSocketService,
    // @Inject(WebSocketService) private webSocketService: WebSocketService,
    private chatRoomService: ChatRoomService,
    private router: Router,
    private store: Store<AppState>
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

  loadChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadChatRoom),
      mergeMap(action =>
        this.chatRoomService.getChatRoom(action.id).pipe(
          tap(chatRoom => {
            this.router.navigate(['/chatrooms', chatRoom.id]);
          }),
          map(chatRoom => ChatActions.loadChatRoomSuccess({ chatRoom })),
          catchError(error => of(ChatActions.loadChatRoomFailure({ error })))
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
  // joinRoom$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ChatActions.joinRoom),
  //       withLatestFrom(this.store.pipe(select(selectUser))),
  //       tap(([action, user]) => {
  //         if (user) {
  //           this.webSocketService.joinRoom(action.roomName, user.username);
  //         } else {
  //           console.error('User is not logged in');
  //         }
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // leaveRoom$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ChatActions.leaveRoom),
  //       tap((action) => {
  //         this.webSocketService.disconnect();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // sendMessage$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ChatActions.sendMessage),
  //       tap((action) =>
  //         this.webSocketService.sendMessage(
  //           action.message.roomName,
  //           action.message.user,
  //           action.message.text
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // receiveMessage$ = createEffect(() =>
  //   this.webSocketService.listen('message').pipe(
  //     map((message) => ChatActions.receiveMessage({ message })),
  //     catchError((error) => of(ChatActions.chatError({ error })))
  //   )
  // );

  // receiveError$ = createEffect(() =>
  //   this.webSocketService
  //     .listen('error')
  //     .pipe(map((error) => ChatActions.chatError({ error })))
  // );
}
