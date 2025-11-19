import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginservice:LoginService){}
  canActivate():boolean{
    let canAccess=sessionStorage.getItem('isLoggedIn')
    return canAccess=='true';
  }
}
