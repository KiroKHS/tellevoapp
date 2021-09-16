import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  @ViewChild('btn',{read: ElementRef}) btn: ElementRef

  conductor: any;
  constructor(
      private ruta: ActivatedRoute,
      public toast: ToastController,
      private animationCtrl : AnimationController
    ) {
    this.ruta.queryParams.subscribe(params =>{
      this.conductor = JSON.parse(params.conductor)
    });
  }
  async showToast() {
    const toast = await this.toast.create({
      message: 'solicitud enviada. esperando respuesta',
      duration: 5000
    });
    toast.present();
  }
  animar(){
    this.animationCtrl.create()
    .addElement(this.btn.nativeElement)
    .duration(2000)
    .fromTo('color','success','danger')
    .iterations(1)
    .play();
  }


  ngOnInit() {
  }

}
