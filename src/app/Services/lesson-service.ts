import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lessonModel } from '../Components/lessons/lessons';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  
  constructor(private http:HttpClient){}

  Lesson_URL='http://localhost:3000/Lessons'

  postLesson(data:lessonModel){
    return  this.http.post(this.Lesson_URL,data)
  }

  getLesson(){
    return this.http.get(this.Lesson_URL)
  }
}
