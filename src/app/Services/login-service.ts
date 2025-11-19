import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient){}
  api_url='https://dummyjson.com/auth/login'

  canAccess:boolean=false;
  validateUser(username: string, password: string): Observable<any> {
    return this.http.post(
    this.api_url,
    { username, password}
  );
}

}
