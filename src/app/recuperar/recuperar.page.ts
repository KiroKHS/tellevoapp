import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  user = {nombre: '' , clave:''};
  constructor(
    public toast: ToastController,
    private router: Router,
    ) { }
  // mensaje de recuperacion
  async showToast() {
    const toast = await this.toast.create({
      message: 'la solicitud fue enviada',
      duration: 5000
    });
    toast.present();
  }
  ngOnInit() {
  }
  async clave(){
    // capturando datos del input
    localStorage.setItem('userpsw',this.user.nombre);
    localStorage.setItem('newpsw',this.user.clave);
    const toast = await this.toast.create({
      message: 'confirme en correo el cambio',
      duration: 5000
    });
    toast.present();
}

}
