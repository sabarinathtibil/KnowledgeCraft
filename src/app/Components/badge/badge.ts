import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../Services/badge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface BadgeModel {
  id: string,
  bid: string,
  name: string,
  status: string,
  info: string,
  date: string
}
@Component({
  selector: 'app-badge',
  imports: [CommonModule, FormsModule],
  templateUrl: './badge.html',
  styleUrls: ['./badge.css'],
})
export class Badge implements OnInit {
  name: string = '';
  info: string = '';
  badges: any[] = [];
  uid: string = JSON.parse(localStorage.getItem('userinfo') || '[]');
  constructor(private badgesevice: BadgeService, private route: Router) { }
  ngOnInit(): void {
    this.badgesevice.getBadgedata().subscribe({
      next: (res: any) => {
        this.badges = res;

      }
    })
  }
  setdata() {
    console.log("working");

    let body: BadgeModel = {
      id: this.uid,
      bid: Date.now().toString(),
      name: this.name,
      status: 'Assigned',
      info: this.info,
      date: new Date().getDate().toString(),
    }
    this.badges.push(body)
    this.badgesevice.postData(body).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
    this.route.navigate(['/quest'], { queryParams: { bid: body.bid } })
  }

}
