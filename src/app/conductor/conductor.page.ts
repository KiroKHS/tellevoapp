import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  @ViewChild('btnpedir',{read: ElementRef}) btnpedir: ElementRef;

  conductor: any;
  constructor(
      private ruta: ActivatedRoute,
      public toast: ToastController,
      private animationCtrl : AnimationController,
    ) {
    this.ruta.queryParams.subscribe(params =>{
      this.conductor = JSON.parse(params.conductor)
    });
  }
  async showToast() {
    const toast = await this.toast.create({
      message: 'solicitud enviada, esperando respuesta.',
      duration: 5000
    });
    toast.present();
  }



  animar(id){
    const  idAnimar = '#' + id;
    this.animationCtrl.create()
    .addElement(document.querySelector(idAnimar))
    .duration(2000)
    .fromTo('color', 'black', 'green')
    .iterations(1)
    .play();
    // para que se salga el mensaje de toast
    this.showToast();
  }

  ngOnInit() {
  }

}
