import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../Services/badge-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  badges:any[]=[];
  uuid:any;
  constructor(private badgeservice:BadgeService){}

  ngOnInit(): void {
    this.badgeservice.getBadgedata().subscribe({
      next:(res:any)=>{
        this.badges=res;
        console.log("working",res);
         let userInfo=JSON.parse(localStorage.getItem('userinfo') || '');
    this.badges=this.badges.filter((arr)=>arr.uuid==userInfo.id);
    console.log(this.badges);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
    

  }
}
