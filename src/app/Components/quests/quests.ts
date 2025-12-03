import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestService } from '../../Services/quest-service';
import { CommonModule } from '@angular/common';

export interface QuestModel {
  bid: string;
  qid: string;
  status: string;
  qname: string;
  date: string;
}

@Component({
  selector: 'app-quests',
  imports: [FormsModule, CommonModule],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
})

export class Quests implements OnInit{
  questName: string = '';
  questDesc: string = '';
  questData: any[] = []
  bid: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questService: QuestService
  ) {
  
  }
  ngOnInit(): void {
      this.route.queryParams.subscribe((p) => {
      this.bid = p['bid'];
    });
    this.questService.getQuest().subscribe({
      next:(res:any)=>{
        this.questData=res;
      }
    })
  }

  goToLesson() {
    let Quest: QuestModel = {
      bid: this.bid,
      qid: Date.now().toString(),
      status: 'Created',
      qname: this.questName,
      date: new Date().getDate().toString(),
    };
    this.questData.push(Quest)
    console.log(this.questName);
    console.log(Quest);
    this.questService.postQuest(Quest).subscribe((res) => {
      console.log(res);
    })

    this.router.navigate(['/home/lessons'], {
      queryParams: { qid: Quest.qid }
    })
  }
}
