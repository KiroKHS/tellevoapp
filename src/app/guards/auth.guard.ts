import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  //* agregando contructor de la clase
  constructor(private router: Router, private storage: Storage){}
  //* retriccion
  async canLoad(){
    //? intentare buscar el logeado
    const logueado = this.storage.get('logueado');
    //? comprobar si hay valor
    if (await logueado === '1'){
      return true;
    }else{
      if (await logueado === '0'){
        this.router.navigate(['login/']);
        return false;}
        //? redirije al usuario
        return false;
    }
  }
}
