import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-quests',
  imports: [],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
})
export class Quests {

  bid:string=''

  constructor(private route:ActivatedRoute,private router:Router){
      route.queryParams.subscribe((p)=>{
        this.bid = p['bid']
        
      })
  }
  
 
}
