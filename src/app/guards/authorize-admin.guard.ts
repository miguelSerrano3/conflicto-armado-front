import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeAdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean>  | boolean {
      const sesion = JSON.parse(sessionStorage.getItem('sesion'));
       if(sesion.rol === 'Admin'){
        return true;
       }else{
        this.router.navigate(['/dashboard'])
        return false;
       }
      
    }
  
}
