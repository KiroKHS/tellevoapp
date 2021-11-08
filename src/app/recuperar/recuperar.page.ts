import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(
    public toast: ToastController,
    public formBuilder: FormBuilder,
    private db: DbService,
    private router: Router,
    ) { }
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
  saveForm(name,clave){
    this.db.updateClave(clave,name)
    .then( (res) => {
      console.log(res);
      this.router.navigate(['/home']);
    });
  }

}
