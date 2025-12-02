import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';

export const routes: Routes = [
  {path:'',component:Register},
  { path: '**', redirectTo: 'login' },
];
