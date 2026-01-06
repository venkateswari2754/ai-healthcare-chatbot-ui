import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  response: string;
  intent?: string;
  data_source?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8001/chat'; // Backend chat endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(message: ChatMessage): Observable<ChatResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<ChatResponse>(this.apiUrl, message, { headers });
  }
}