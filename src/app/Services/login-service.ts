import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export
  interface Task {
  id: string,
  name: string,
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  api_url = 'http://localhost:3000/usersInfo';
  constructor(private http: HttpClient) { }

  getUserData(id: string) {
    return this.http.get(`${this.api_url}/${id}`);
  }

  addUser(body: any) {
    return this.http.post(this.api_url, body);
  }
}
