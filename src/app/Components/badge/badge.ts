import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../Services/badge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestService } from '../../Services/quest-service';
import { Quests } from '../quests/quests';

export interface BadgeModel{
  uuid:string,
  bid:string,
  name:string,
  status:string,
  info:string,
  date:string
}
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badge.html',
  styleUrls: ['./badge.css'],
})
export class Badge implements OnInit{
  name:string='';
  info:string='';
  badges: BadgeModel[] = [];
  uuid:any;
  // UI bindings used in template
  searchTerm: string = '';
  tagFilter: string = '';
  selectedBadge: BadgeModel | null = null;
  quests:any[]=[];
  quets:any[]=[];
constructor(private badgesevice: BadgeService,private  route:Router,private qustService:QuestService) {}
ngOnInit(): void {
  this.uuid=JSON.parse(localStorage.getItem('userinfo')|| '')
 this.badgesevice.getBadgedata().subscribe({
  next:(res:any)=>{
    this.badges=res;
     let userInfo=JSON.parse(localStorage.getItem('userinfo') || '');
    this.badges=this.badges.filter((arr)=>arr.uuid==userInfo.id);
    console.log(this.badges);
  }
 })


 
}
  setdata(){
    console.log("working");
    
    let body:BadgeModel={
      uuid:this.uuid.id,
      bid:Date.now().toString(),
      name:this.name,
      status:'Initiated',
      info:this.info,
      date:new Date().getDate().toString(),
    }
    console.log(body.uuid);
    
this.badges.push(body)
    this.badgesevice.postData(body).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
    this.route.navigate(['home/quests'],{queryParams:{bid:body.bid}})
  }

  addBadge(){
    this.setdata();
  }

  viewBadge(b: any){
    this.selectedBadge = b;
    console.log(this.selectedBadge);
    this.qustService.getQuest().subscribe({
      next:(res:any)=>{
        this.quests=res;
        this.quets=res;
        this.quests=this.quests.filter((arr)=>arr.bid==this.selectedBadge?.bid)
        this.quets=this.quests;
        console.log(this.quests);
      }
    })
  }
    
  }

//   editBadge(b: any){
//     this.name = b.name;
//     this.info = b.info;
//     this.selectedBadge = b;
//   }

//   clearFilters(){
//     this.searchTerm = '';
//     this.tagFilter = '';
//   }
// }
