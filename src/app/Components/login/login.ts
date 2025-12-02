import { Component, OnInit } from '@angular/core';
import { LoginService, Task } from '../../Services/login-service';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{

  constructor(private loginService: LoginService) { }
 
  
}
