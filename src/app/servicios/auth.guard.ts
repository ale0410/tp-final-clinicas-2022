import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: any = JSON.parse(localStorage.getItem('user') || "");

    if (user /*&& user.tipo == 'administrador'*/) {
      
      return true;
    }
    else {
      this.router.navigate(['home']);
      return false;
    }
    /*else if(user && user.tipo == 'especialista')
    {
      return true;
    }
    else if(user && user.tipo == 'paciente')
    {
      return true;
    }*/
    
  }
  
}
