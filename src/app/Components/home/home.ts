import { Component, OnInit, signal } from '@angular/core';
import { Badge } from '../badge/badge';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { BadgeService } from '../../Services/badge-service';

@Component({
  selector: 'app-home',
  imports: [Badge,Sidebar,Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  badges:any[]=[];
  uid:string=JSON.parse(localStorage.getItem('userinfo')|| '[]');

  constructor(private badgeservice:BadgeService){}
 ngOnInit(): void {
   this.badgeservice.getBadgedata().subscribe({
    next:(res:any)=>{
      this.badges=res;
      this.badges=this.badges.filter((arr)=>arr.uid===this.uid)
    }
   })
 }
}
