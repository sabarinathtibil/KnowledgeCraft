import { Routes } from '@angular/router';
import { LoginPage } from './Components/login-page/login-page';
import { Course } from './Components/course/course';
import { LandingPage } from './Components/landing-page/landing-page';
import { AuthGuard } from './Services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },

  {
    path: 'home',
    component: LandingPage,
    canActivate: [AuthGuard],
    children: [
      { path: 'course', component: Course }
    ],
  },

  // Default redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Must be last → handles invalid paths
  { path: '**', redirectTo: 'login' },
];
