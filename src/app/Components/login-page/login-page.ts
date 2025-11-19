import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login-service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {


  username:string='';
  password:string='';
constructor(private loginservice:LoginService){}

  login():void{
    this.loginservice.validateUser(this.username,this.password).subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete(){
        console.log("hey succesfully loged in!");
        
      }
    })
  }

}
