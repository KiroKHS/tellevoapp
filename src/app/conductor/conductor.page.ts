import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DbService } from './../service/db.service';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  @ViewChild('btnpedir', { read: ElementRef })
  btnpedir: ElementRef;
  editForm: FormGroup;
  id: any;
  conductor: any;
  constructor(
    private db: DbService,
    private ruta: ActivatedRoute,
    public toast: ToastController,
    private animationCtrl: AnimationController,
    public formBuilder: FormBuilder,
    private storage: Storage

  ) {
    this.id = this.ruta.snapshot.paramMap.get('id');
    console.log('ID: '+ this.id);
    this.db.getConductor(this.id).then(res => {
      this.conductor = res;
      console.log(this.conductor);
    });
  }



  async showToast() {
    const toast = await this.toast.create({
      message: 'solicitud enviada, esperando respuesta.',
      duration: 5000
    });
    toast.present();
  }

  animar(id) {
    const idAnimar = '#' + id;
    this.animationCtrl.create()
      .addElement(document.querySelector(idAnimar))
      .duration(2000)
      .fromTo('color', 'black', 'green')
      .iterations(1)
      .play();
    // para que se salga el mensaje de toast
    this.showToast();
  }

  async storeData(hora) {
    const usuario = await this.storage.get('username');
    const direccion = await this.storage.get('casa');
    console.log('usuario'+usuario,'direccion'+direccion);
    this.db.addPedido(this.conductor.id_conductor, usuario,direccion,hora);
  }

  ngOnInit() {
  }

}
