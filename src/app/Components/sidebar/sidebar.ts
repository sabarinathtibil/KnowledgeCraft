import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  isCollapsed = false;

  navItems = [
    { name: 'Dashboard', icon: '📊', route: '/home' },
    { name: 'Profile', icon: '👤', route: '/profile' },
    { name: 'Courses', icon: '📚', route: '/courses' },
    { name: 'Badges', icon: '🏅', route: '/badges' },
    { name: 'Analytics', icon: '📈', route: '/analytics' },
    { name: 'Settings', icon: '⚙️', route: '/settings' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('userinfo');
    this.router.navigateByUrl('login');
  }
}
