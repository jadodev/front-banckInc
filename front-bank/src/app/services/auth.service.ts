import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserResponse {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://44.215.106.122:8081/users';

  constructor(private http: HttpClient) {}

  registerUser(userData: { username: string; password: string }): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, userData);
  }

  loginUser(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/search?username=${username}`);
  }
}
