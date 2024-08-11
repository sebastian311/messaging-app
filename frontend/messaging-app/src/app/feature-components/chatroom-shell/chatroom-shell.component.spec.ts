import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { ChatroomShellComponent } from './chatroom-shell.component';
import { AppState } from '../../state-management/reducers';
import { AuthState, UIState, UsersState, ChatState } from '../../data-access/models/State';

describe('ChatroomShellComponent', () => {
  let component: ChatroomShellComponent;
  let fixture: ComponentFixture<ChatroomShellComponent>;
  let store: MockStore;
  
  const initialState: AppState = {
    auth: {} as AuthState,
    ui: {} as UIState,
    users: {} as UsersState,
    chat: {} as ChatState
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatroomShellComponent, HttpClientModule],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ChatroomShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
