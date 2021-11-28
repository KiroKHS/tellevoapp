import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from '../service/db.service';
import { Storage } from '@ionic/storage-angular';



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
    private storage: Storage,
    private db: DbService,
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
    console.log('nombre: '+this.user.nombre);
     await this.storage.set('userpsw',this.user.nombre);
     await this.storage.set('newpsw',this.user.clave);
    this.db.updateClave();
    const toast = await this.toast.create({
      message: 'confirme en correo el cambio',
      duration: 5000
    });
    toast.present();
}

}
