import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared-components/header/header.component';

@Component({
  selector: 'app-chatroom-shell',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './chatroom-shell.component.html',
  styleUrl: './chatroom-shell.component.scss'
})
export class ChatroomShellComponent {

}
