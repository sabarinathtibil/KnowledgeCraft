import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Sidebar } from './Components/sidebar/sidebar';
import { Header } from './Components/header/header';
import { CommonModule } from '@angular/common';
import { Home } from './Components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Header, CommonModule,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('KnowledgeCraft');
  showLayout = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.checkIfLoginPage();
    });
  }

  checkIfLoginPage() {
    this.showLayout = !this.router.url.includes('login') && !this.router.url.includes('register');
  }
}
