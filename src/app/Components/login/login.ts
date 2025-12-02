import { Component, OnInit } from '@angular/core';
import { LoginService, Task } from '../../Services/login-service';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  constructor(private loginService:LoginService){}
  ngOnInit(): void {
    this.regesterUser()
  }
  regesterUser(){
    let body:Task={
      id:Date.now().toString(),
      name:'shashank',
      email:'shashankr@gmail.com',
      password:'Iamshashi'
    }
    this.loginService.addUser(body).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
