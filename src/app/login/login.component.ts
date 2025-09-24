import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule} from '@angular/forms'
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', this.username);
    body.set('password', this.password);

    this.http.post('http://127.0.0.1:8000/api/v1/users/login', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.access_token);
        alert('Login successful!');
      },
      err => {
        alert('Login failed!');
      }
    );
  }
}
