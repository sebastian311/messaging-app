import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../state-management/reducers';
import { selectIsLogged } from '../../state-management/selectors/auth-selectors';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import { logout } from '../../state-management/actions/auth-actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);

  constructor(private store: Store<AppState>, private authService: AuthenticationService) {
    if(this.authService.isAuthenticated()) this.isLogged$ = of(true);
  }
  
  logout() {
    this.store.dispatch(logout());
  }
}
