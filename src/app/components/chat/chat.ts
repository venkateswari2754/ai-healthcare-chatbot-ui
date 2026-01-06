import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChatService, ChatMessage, ChatResponse } from '../../services/chat';
import { AuthService } from '../../services/auth';

interface ChatHistoryItem {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  intent?: string;
  dataSource?: string;
}

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  chatHistory: ChatHistoryItem[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    // Add welcome message
    this.addMessage('bot', 'Hello! I\'m your healthcare support assistant. How can I help you today?');
  }

  onSubmit(): void {
    if (this.chatForm.valid && !this.loading) {
      const message = this.chatForm.value.message.trim();
      this.addMessage('user', message);
      this.chatForm.reset();
      this.loading = true;
      this.chatForm.get('message')?.disable();

      this.chatService.sendMessage({ message }).subscribe({
        next: (response) => {
          this.loading = false;
          this.chatForm.get('message')?.enable();
          this.addMessage('bot', response.response, response.intent, response.data_source);
        },
        error: (error) => {
          this.loading = false;
          this.chatForm.get('message')?.enable();
          this.addMessage('bot', 'Sorry, I encountered an error. Please try again.');
          console.error('Chat error:', error);
        }
      });
    }
  }

  private addMessage(type: 'user' | 'bot', message: string, intent?: string, dataSource?: string): void {
    message = message.replace(/\n/g, '<br>');
    this.chatHistory.push({
      type,
      message,
      timestamp: new Date(),
      intent,
      dataSource
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}