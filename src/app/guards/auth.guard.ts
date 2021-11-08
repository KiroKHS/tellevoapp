import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  //* agregando contructor de la clase
  constructor(private router: Router){}
  //* retriccion
  canLoad(){
    //? intentare buscar el logeado
    const logueado = localStorage.getItem('logueado');
    //? comprobar si hay valor
    if (logueado === '1'){
      return true;
    }else{
      //? redirije al usuario
      this.router.navigate(['login/']);
      return false;
    }
  }
}
