import { Component, OnInit } from '@angular/core';
import { Badge } from '../badge/badge';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Badge],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit{
  userInfo:any;
  ngOnInit(): void {
    this.userInfo=JSON.parse(localStorage.getItem('userinfo') || '')
  }
}
