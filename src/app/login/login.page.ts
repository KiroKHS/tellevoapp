import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // creando variables usuarios
  user = {nombre: "", clave: ""}
  constructor(private router:Router,
              public toast: ToastController) { }

  ngOnInit() {
  }
  async showToast() {
    const toast = await this.toast.create({
      message: 'campos vacios o incorrectos',
      duration: 5000
    });
    toast.present();
  }

  login(){
    // capturando datos del input
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };
    if (this.user.nombre.length > 0){
      //re direcciona al usuario y enviando datos de usuario
      this.router.navigate(['/home'],navExtras);

    }else{
      this.showToast();
    }
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
