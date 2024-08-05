import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomShellComponent } from './chatroom-shell.component';

describe('ChatroomShellComponent', () => {
  let component: ChatroomShellComponent;
  let fixture: ComponentFixture<ChatroomShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatroomShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatroomShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
