import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Home } from './Components/home/home';
import { Quests } from './Components/quests/quests';
import { Badge } from './Components/badge/badge';
import { Lessons } from './Components/lessons/lessons';

export const routes: Routes = [
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'home',component:Home},
  {path:"badge" , component:Badge},
  {path:"quest" , component:Quests},
  {path:"lessons" , component:Lessons},
  { path: '**', redirectTo: 'login' },
];
