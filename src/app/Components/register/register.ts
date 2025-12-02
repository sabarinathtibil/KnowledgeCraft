import { Component } from '@angular/core';
import { LoginService, Task } from '../../Services/login-service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {  
  constructor(private loginService: LoginService) { }

regesterUser() {
    let body: Task = {
      id: Date.now().toString(),
      name: 'shashank',
      email: 'shashankr@gmail.com',
      password: 'Iamshashi'
    }
    this.loginService.addUser(body).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
