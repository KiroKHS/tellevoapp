import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.page.html',
  styleUrls: ['./peticion.page.scss'],
})
export class PeticionPage implements OnInit {

  constructor(
    public toast: ToastController,
    private animationCtrl: AnimationController,
    private activeroute: ActivatedRoute,
    private router: Router,
    ) { }


    async showToast(sol) {
    const mensaje = sol;
    const toast = await this.toast.create({
      message: mensaje ,
      duration: 5000
    });
    toast.present();
  }



  animarYes(id){
    const  idAnimar = '#' + id;
    this.animationCtrl.create()
    .addElement(document.querySelector(idAnimar))
    .duration(1000)
    .fromTo('color', 'black', 'green')
    .iterations(1)
    .play();
    // para que se salga el mensaje de toast
    this.showToast('Solicitud Aceptada');
  }
  animarNo(id){
    const  idAnimar = '#' + id;
    this.animationCtrl.create()
    .addElement(document.querySelector(idAnimar))
    .duration(1000)
    .fromTo('color', 'black', 'red')
    .iterations(1)
    .play();
    // para que se salga el mensaje de toast
    this.showToast('Solicitud Rechazada');
  }

  ngOnInit() {
  }
peticion : any = [{
  id:1,
  name:'Rakan',
  casa: true,
  direccion: 'jonia',
  duoc: false,
  imageUrl: 'http://pm1.narvii.com/6594/b99e546e71a103a71c41935bc91b4e9bd3606190_00.jpg'
},{
  id:2,
  name:'Sett',
  casa: false,
  direccion: 'jonia',
  duoc: true,
  imageUrl: 'https://www.mobafire.com/images/avatars/sett-pool-party.png'
},];
}
