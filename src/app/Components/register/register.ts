import { Component } from '@angular/core';
import { LoginService, Task } from '../../Services/login-service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {  
  emailExistsError = false;
  constructor(private loginService: LoginService,private route:Router) { }
  userform = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])
});
  checkEmailExists = (control: AbstractControl): Promise<ValidationErrors | null> => {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      this.loginService.checkEmailExists(control.value).subscribe({
        next: (res: any) => {
          if (res && res.length > 0) {
            this.emailExistsError = true;
            resolve({ emailExists: true });
          } else {
            this.emailExistsError = false;
            resolve(null);
          }
        },
        error: () => {
          this.emailExistsError = false;
          resolve(null);
        }
      });
    });
  }

regesterUser() {
  if (this.userform.invalid) {
    alert('Please fill out all required fields correctly');
    return;
  }

  const email = this.userform.get('email')?.value || '';
  
  this.loginService.checkEmailExists(email).subscribe({
    next: (res: any) => {
      if (res && res.length > 0) {
        alert('Email already exists. Please use a different email.');
        this.emailExistsError = true;
        return;
      }

      let body: Task = {
        id: Date.now().toString(),
        name: this.userform.get('name')?.value || '',
        email: this.userform.get('email')?.value || '',
        password: this.userform.get('password')?.value || ''
      }
      
      this.loginService.addUser(body).subscribe({
        next: (res) => {
          console.log(res);
          alert('Registration successful!');
          this.userform.reset();
          this.route.navigateByUrl('login')
        },
        error: (err) => {
          console.log(err);
          alert('Registration failed. Please try again.');
        }
      })
    },
    error: (err) => {
      console.log(err);
      alert('Could not verify email. Please try again.');
    }
  });
}
}
