import { Component, OnInit } from '@angular/core';
import { LoginService, Task } from '../../Services/login-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { flush } from '@angular/core/testing';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{

  constructor(private loginService: LoginService,private route :Router) { }
  username:string='';
  password:string='';
  showPopup:boolean=false;
  err_msg:string='no error found';
 
  login(){
    this.loginService.getAllUsers().subscribe({
      next:(res)=>{
        const user = (res as any[]).find((u: any) => u.email === this.username && u.password === this.password);
        if (user) {
          // successful login — replace with navigation/token logic as needed
          console.log('Login successful', user);
          this.route.navigateByUrl('home')

        } else {
          // failed login
          this.showPopup=true;
          setTimeout(() => {
            this.showPopup=false
          }, 3000);
          console.warn('Invalid username or password');
        }
      }
    })
  } 

  reg(){
    this.route.navigateByUrl('register')
    // console.log("workin");
    
  }
}
