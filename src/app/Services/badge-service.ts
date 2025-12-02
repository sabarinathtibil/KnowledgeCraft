import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  api_url='http://localhost:3000/badges'
  constructor(private http :HttpClient){}

  postData(body:any){
    return this.http.post(this.api_url,body);
  }
  getBadgedata(){
    return this.http.get(this.api_url);
  }
}
