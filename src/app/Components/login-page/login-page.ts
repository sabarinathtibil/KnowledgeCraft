// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { LoginService } from '../../Services/login-service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login-page',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './login-page.html',
//   styleUrl: './login-page.css',
// })
// export class LoginPage implements OnInit {
//   username:string='';
//   password:string='';
//   constructor(
//   private loginservice:LoginService,
//   private router:Router
// ){}
// ngOnInit(): void {
//   const value=sessionStorage.getItem('isLoggedIn')
  
//   if(value=='true'){
//     console.log("dd");
//     this.router.navigateByUrl('home/course');

//   }
  
// }


//   login():void{
//     const value=sessionStorage.getItem('isLoggedIn')

//     if(value!=='true'){
//     this.loginservice.validateUser(this.username,this.password).subscribe({
//       next:(response)=>{
//         console.log(response);
//         sessionStorage.setItem('isLoggedIn','true');
//         const val=sessionStorage.getItem('isLoggedIn');
//         this.loginservice.canAccess=val === 'true';
        
//         this.router.navigateByUrl('home/course');
//       },
//       error:(err)=>{
//         console.log(err);
//         this.router.navigateByUrl('login');
//       },
//       complete(){
//         console.log("hey succesfully loged in!");
//       }
//     })
//   }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'],
})
export class LoginPage implements OnInit {
  
  username: string = '';
  password: string = '';

  constructor(
    private loginservice: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const value = sessionStorage.getItem('isLoggedIn');
    if (value === 'true') {
      console.log('Already logged in');
      this.router.navigateByUrl('home/course');
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      console.log('Username and password required');
      return;
    }

    this.loginservice.validateUser(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);

        // Save login state
        sessionStorage.setItem('isLoggedIn', 'true');

        this.router.navigateByUrl('home/course');
      },
      error: (err) => {
        console.log(err);
        sessionStorage.setItem('isLoggedIn', 'false');

        console.log('Invalid Credentials');
      },
      complete() {
        console.log('Login request completed!');
      }
    });
  }
}
