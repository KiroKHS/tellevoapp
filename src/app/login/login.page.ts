import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // creando variables usuarios
  user = {nombre: "", clave: ""}
  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };
    //re direcciona al usuario y enviando datos de usuario
    this.router.navigate(['/home'],navExtras);
}
// enviar al recuperar contrasenia
  recuperar(){
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };
    //re direcciona al usuario 
    this.router.navigate(['/recuperar',navExtras]);
}
}
