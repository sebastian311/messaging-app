import { Routes } from '@angular/router';
import { AuthComponent } from './feature-components/auth/auth.component';
import { ChatroomListComponent } from './feature-components/chatroom-list/chatroom-list.component';
import { ChatroomShellComponent } from './feature-components/chatroom-shell/chatroom-shell.component';
import { ChatroomComponent } from './feature-components/chatroom/chatroom.component';
import { authGuard } from './data-access/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ChatroomShellComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'chatrooms',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: ChatroomListComponent,
          },
          {
            path: ':id',
            component: ChatroomComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: 'chatrooms',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
