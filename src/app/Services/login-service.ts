import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient){}
  api_url='https://dummyjson.com/auth/login'

//   validateUser(username:string,password:string):Observable<any> {
//    let userObj={
//     username:username,
//     password:password,
//   }
//   return this.http.post(this.api_url,userObj)
//   }
// }\

validateUser(username: string, password: string): Observable<any> {
  return this.http.post(
    this.api_url,
    { username, password}
  );
}

}
