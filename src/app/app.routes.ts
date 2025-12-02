import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Home } from './Components/home/home';

export const routes: Routes = [
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'home',component:Home},
  { path: '**', redirectTo: 'login' },
];
