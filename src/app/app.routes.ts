import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Home } from './Components/home/home';
import { Quests } from './Components/quests/quests';
import { Badge } from './Components/badge/badge';
import { Lessons } from './Components/lessons/lessons';
import { Dashboard } from './Components/dashboard/dashboard';

export const routes: Routes = [
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'home',component:Home, children:[
    {path:"badge" , component:Badge},
    {path:"quests" , component:Quests},
    {path:"lessons" , component:Lessons},
    {path:'dashboard',component:Dashboard},
  ]},
  { path: '**', redirectTo: 'login' },
];
