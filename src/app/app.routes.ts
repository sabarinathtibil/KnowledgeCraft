import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Home } from './Components/home/home';
import { Badge } from './Components/badge/badge';

export const routes: Routes = [
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'home',component:Home},
  {path:'profile',component:Home},
  {path:'courses',component:Home},
  {path:'badges',component:Badge},
  {path:'analytics',component:Home},
  {path:'settings',component:Home},
  { path: '**', redirectTo: 'login' },
];
