import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../Services/lesson-service';
import { CommonModule } from '@angular/common';

export interface lessonModel {
  qid: string;
  lid: string;
  status: string;
  lname: string;
  date: string;
  link: string;
}

@Component({
  selector: 'app-lessons',
  imports: [FormsModule,CommonModule],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css',
})
export class Lessons implements OnInit {
  lessonName: string = '';
  lessonLink: string = '';
  qid: string = '';
  lessonData:any[]=[]
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router:Router
  ) {
   
  }

  ngOnInit(): void {
     this.route.queryParams.subscribe((para) => {
      this.qid = para['qid'];
    });

    this.lessonService.getLesson().subscribe({
      next:(res:any)=>{
        this.lessonData=res
      }
    })
  }

  CreateBadge() {
    let lesson: lessonModel = {
      qid: this.qid,
      lid: Date.now().toString(),
      status: 'Created',
      lname: this.lessonName,
      date: new Date().getDate().toString(),
      link: this.lessonLink,
    };

    this.lessonData.push(lesson)
    console.log(lesson);
    this.lessonService.postLesson(lesson).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/home'])
    })
  }
}
