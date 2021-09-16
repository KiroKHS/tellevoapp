import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(public toast: ToastController) { }
  // mensaje de recuperacion
  async showToast() {
    const toast = await this.toast.create({
      message: 'Su clave fue enviada al correo!.',
      duration: 5000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
