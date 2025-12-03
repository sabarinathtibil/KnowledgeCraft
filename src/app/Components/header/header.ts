import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  userInfo: any = null;
  notifications = [
    { id: 1, message: 'New course available: Angular Advanced', time: '2 hours ago', read: false },
    { id: 2, message: 'You earned a new badge!', time: '5 hours ago', read: false },
    { id: 3, message: 'Your profile was updated', time: '1 day ago', read: true },
  ];
  unreadCount = 0;
  showNotificationDropdown = false;
  showProfileDropdown = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserInfo();
    this.calculateUnreadNotifications();
  }

  loadUserInfo() {
    const userdata = localStorage.getItem('userinfo');
    if (userdata) {
      this.userInfo = JSON.parse(userdata);
    }
  }

  calculateUnreadNotifications() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  toggleNotificationDropdown() {
    this.showNotificationDropdown = !this.showNotificationDropdown;
    this.showProfileDropdown = false;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showNotificationDropdown = false;
  }

  markNotificationAsRead(notificationId: number) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.calculateUnreadNotifications();
    }
  }

  clearAllNotifications() {
    this.notifications = [];
    this.calculateUnreadNotifications();
  }

  goToProfile() {
    this.router.navigateByUrl('profile');
    this.showProfileDropdown = false;
  }

  goToSettings() {
    this.router.navigateByUrl('settings');
    this.showProfileDropdown = false;
  }

  logout() {
    localStorage.removeItem('userinfo');
    this.router.navigateByUrl('login');
  }
}
