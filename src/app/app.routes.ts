import { Routes } from '@angular/router';
import { PageNotFound } from './Shared-Components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '**', component:PageNotFound},
];
