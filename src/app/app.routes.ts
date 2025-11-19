import { Routes } from '@angular/router';
import { LoginPage } from './Components/login-page/login-page';
import { Home } from './Components/home/home';

export const routes: Routes = [
    {path:'',component:LoginPage},
    {path:'home',component:Home}
];
