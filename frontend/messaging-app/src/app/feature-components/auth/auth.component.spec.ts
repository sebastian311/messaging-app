import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthComponent } from './auth.component';
import { AuthState, UIState, UsersState, ChatState } from '../../data-access/models/State';
import { AppState } from '../../state-management/reducers';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;
  
  const initialState: AppState = {
    auth: {} as AuthState,
    ui: {} as UIState,
    users: {} as UsersState,
    chat: {} as ChatState
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
