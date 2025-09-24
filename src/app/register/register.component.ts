import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  client_id = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const body = {
      email: this.email,
      password: this.password,
      client_id: this.client_id
    };
    this.http.post('http://127.0.0.1:8000/api/v1/users/register', body).subscribe(
      res => {
        alert('Registration successful!');
      },
      err => {
        alert('Registration failed!');
      }
    );
  }
}
