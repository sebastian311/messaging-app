import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ChatroomListComponent } from './chatroom-list.component';
import { AppState } from '../../state-management/reducers';
import { AuthState, ChatState, UIState, UsersState } from '../../data-access/models/State';

describe('ChatroomListComponent', () => {
  let component: ChatroomListComponent;
  let fixture: ComponentFixture<ChatroomListComponent>;
  let store: MockStore;
  
  const initialState: AppState = {
    auth: {} as AuthState,
    ui: {} as UIState,
    users: {} as UsersState,
    chat: {} as ChatState
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ChatroomListComponent ],
      providers: [ provideMockStore({ initialState }) ]
    })
    .compileComponents();
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ChatroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
