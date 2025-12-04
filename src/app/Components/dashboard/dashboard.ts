import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../Services/badge-service';
import { QuestService } from '../../Services/quest-service';
import { LessonService } from '../../Services/lesson-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  badges: any[] = [];
  uuid: any;
  quests: any[] = [];
  lessons: any[] = [];
  recentBadges: any[] = [];
  recentQuests: any[] = [];
  recentLessons: any[] = [];
  badgeCount: number = 0;
  questCount: number = 0;
  lessonCount: number = 0;
  loading: boolean = false;
  constructor(
    private badgeservice: BadgeService,
    private questService: QuestService,
    private lessonService: LessonService,
    private router: Router
      ) { }

  ngOnInit(): void {
    this.loading = true;
    const userInfo = JSON.parse(localStorage.getItem('userinfo') || '{}');

    this.badgeservice.getBadgedata().subscribe({
      next: (res: any) => {
        this.badges = (res || []).filter((b: any) => b.uuid == userInfo.id);
        this.badgeCount = this.badges.length;
        this.recentBadges = this.badges.slice().reverse().slice(0, 6);
        this.loading = false;
      },
      error: (err) => { console.log(err); this.loading = false; }
    });

    this.questService.getQuest().subscribe({
      next: (res: any) => {
        this.quests = (res || []).filter((q: any) => q.uuid == userInfo.id || q.uid == userInfo.id || q.bid && this.badges.find(b => b.bid == q.bid));
        this.questCount = this.quests.length;
        this.recentQuests = (this.quests || []).slice().reverse().slice(0, 6);
      }, error: (err) => { console.log(err); }
    });

    this.lessonService.getLesson().subscribe({
      next: (res: any) => {
        this.lessons = (res || []).filter((l: any) => l.qid);
        this.lessonCount = this.lessons.length;
        this.recentLessons = (this.lessons || []).slice().reverse().slice(0, 6);
      }, error: (err) => { console.log(err); }
    });
  }

  openBadge(b: any) {
    this.router.navigate(['/home/badge'], { queryParams: { bid: b.bid } });
  }

  openQuest(q: any) {
    this.router.navigate(['/home/quests'], { queryParams: { qid: q.qid } });
  }

  openLesson(l: any) {
    this.router.navigate(['/home/lessons'], { queryParams: { qid: l.qid } });
  }
}
