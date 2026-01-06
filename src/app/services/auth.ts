import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  client_code: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  created_at: string;
  client_name?: string;
  client_code?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8000';
  private readonly TOKEN_KEY = 'healthcare_token';
  private readonly platformId = inject(PLATFORM_ID);
  
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in on app start (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthStatus();
    }
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  login(credentials: LoginRequest): Observable<TokenResponse> {
    // The backend error indicates it expects a JSON body, not Form Data.
    const payload = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post<TokenResponse>(`${this.API_URL}/login`, payload)
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.isLoggedInSubject.next(true);
          // Fetch user details after successful login
          this.getCurrentUser().subscribe(user => {
            this.currentUserSubject.next(user);
          });
        })
      );
  }

  register(userData: RegisterRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.isLoggedInSubject.next(true);
          // Fetch user details after successful registration
          this.getCurrentUser().subscribe(user => {
            this.currentUserSubject.next(user);
          });
        })
      );
  }

  getCurrentUser(): Observable<UserResponse> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserResponse>(`${this.API_URL}/me`, { headers });
  }

  logout(): void {
    this.removeToken();
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
