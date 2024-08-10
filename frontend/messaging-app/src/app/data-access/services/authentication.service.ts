import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

interface AuthResponse {
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient){}

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) return !!localStorage?.getItem('token');
    return false;
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/register`, { username, password } )
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/login`, { username, password } )
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage?.removeItem('token');
      localStorage?.removeItem('user');
    } else {
      alert("ERROR: Could not log out!")
    }
  }
}
