import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestService {

  constructor(private http:HttpClient){}

  questURL = 'http://localhost:3000/quests';

  getQuest(){
    return this.http.get(this.questURL)
  }

  postQuest(data:any){
    return this.http.post(this.questURL,data)
  }

}
