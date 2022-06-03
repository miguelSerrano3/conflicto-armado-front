import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild, CanActivate {

  constructor(private router: Router) { }
  canActivateChild(): Observable<boolean>  | boolean {
    const sesion = JSON.parse(sessionStorage.getItem('sesion'));
     if(sesion){
      return true;
     }else{
      this.router.navigate(['/home'])
      return false;
     }
    
  }

  canActivate(): Observable<boolean>  | boolean {
    const sesion = JSON.parse(sessionStorage.getItem('sesion'));
     if(sesion){
      this.router.navigate(['/dashboard'])
      return false;
     }else{
      return true;
     }
    
  }
  
}
