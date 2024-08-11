import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter, Router } from '@angular/router';
import { ChatRoom } from '../../data-access/models/Chatroom';
import { HttpClientModule } from '@angular/common/http';
import { NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';
import { AppState } from '../../state-management/reducers';
import { WebSocketService } from '../../data-access/services/web-socket.service';
import {
  AuthState,
  UIState,
  UsersState,
  ChatState,
} from '../../data-access/models/State';
import { ChatroomComponent } from './chatroom.component';
import { selectCurrentRoom } from '../../state-management/selectors/chatroom-selectors';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AuthenticationService } from '../../data-access/services/authentication.service';

describe('ChatroomComponent', () => {
  let component: ChatroomComponent;
  let fixture: ComponentFixture<ChatroomComponent>;
  let store: MockStore<AppState>;
  let webSocketService: jasmine.SpyObj<WebSocketService>;
  let router: Router;
  let routerEvents$: Subject<any>;

  const mockChatRoom: ChatRoom = { name: 'testroom' }; // Mock ChatRoom data

  const initialState: AppState = {
    auth: {} as AuthState,
    ui: {} as UIState,
    users: {} as UsersState,
    chat: {
      currentRoom: mockChatRoom,
    } as unknown as ChatState,
  };

  beforeEach(async () => {
    const webSocketSpy = jasmine.createSpyObj('WebSocketService', [
      'connect',
      'disconnect',
      'joinRoom',
      'getMessages',
      'sendMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ChatroomComponent],
      providers: [
        AuthenticationService,
        provideMockStore({ initialState }),
        { provide: WebSocketService, useValue: webSocketSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    // Mock localStorage
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));

    store = TestBed.inject(MockStore);
    webSocketService = TestBed.inject(
      WebSocketService
    ) as jasmine.SpyObj<WebSocketService>;

    // Mock the selector to return the current room
    store.overrideSelector(selectCurrentRoom, mockChatRoom);

    router = TestBed.inject(Router);
    routerEvents$ = new Subject();
    spyOn(router.events, 'pipe').and.returnValue(routerEvents$);

    // Mock the WebSocket getMessages method to simulate incoming messages
    webSocketService.getMessages.and.returnValue(
      of({ user: 'anotherUser', text: 'Hi there!', timestamp: Date.now() })
    );

    fixture = TestBed.createComponent(ChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('user');
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect to WebSocket on initialization', () => {
    expect(webSocketService.connect).toHaveBeenCalled();
  });

  it('should disconnect from WebSocket on route change', () => {
    routerEvents$.next(new NavigationEnd(1, '', ''));
    expect(webSocketService.disconnect).toHaveBeenCalled();
  });

  it('should join room if chatroom data and user are available', () => {
    fixture.detectChanges();
    expect(webSocketService.joinRoom).toHaveBeenCalledWith(
      'testroom',
      'testuser'
    );
  });

  it('should add incoming messages to the message list', () => {
    fixture.detectChanges();
    expect(component.messages.length).toBeGreaterThan(0);
    expect(component.messages[0].username).toBe('anotherUser');
    expect(component.messages[0].content).toBe('Hi there!');
  });

  it('should send a message when sendMessage is called', () => {
    webSocketService.getMessages.and.returnValue(of());
    component.messages = [];

    // Set initial conditions
    const chatroom: ChatRoom = { name: 'testroom' };
    component.newMessage = 'Test message';

    component.sendMessage(chatroom);

    expect(webSocketService.sendMessage).toHaveBeenCalledWith(
      'testroom',
      'testuser',
      'Test message'
    );

    expect(component.messages.length).toBe(1);
    expect(component.messages[0].content).toBe('Test message');
    expect(component.newMessage).toBe('');
  });

  it('should scroll to bottom when new message is added', () => {
    const scrollSpy = spyOn(component, 'scrollToBottom').and.callThrough();

    const chatContainerElement = fixture.debugElement.query(
      By.css('.chat-container')
    );
    (component as any).chatContainer = chatContainerElement as ElementRef;

    const chatroom: ChatRoom = { name: 'testroom' };
    component.sendMessage(chatroom);

    fixture.detectChanges();
    expect(scrollSpy).toHaveBeenCalled();
  });
});
