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

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/register`, { username, password } )
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/login`, { username, password } )
  }
}
