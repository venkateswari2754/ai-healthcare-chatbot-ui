import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <--- Make sure this is imported

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <--- Make sure this is in imports
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'healthcare-frontend';
}
