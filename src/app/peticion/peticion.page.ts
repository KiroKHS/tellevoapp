import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from './../service/db.service';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.page.html',
  styleUrls: ['./peticion.page.scss'],
})
export class PeticionPage implements OnInit {

  data: any[]=[];

  constructor(
    private navCTRL: NavController,
    public toast: ToastController,
    private animationCtrl: AnimationController,
    private activeroute: ActivatedRoute,
    private router: Router,
    private db: DbService,
    public formBuilder: FormBuilder,
    ) { }


    async showToast(sol) {
    const mensaje = sol;
    const toast = await this.toast.create({
      message: mensaje ,
      duration: 5000
    });
    toast.present();
  }

  logout(){
    localStorage.removeItem('logueado');//borando item storage
    this.router.navigate(['login/']);
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
  animarNo(name,id){
    const  idAnimar = '#' + name+id;
    this.animationCtrl.create()
    .addElement(document.querySelector(idAnimar))
    .duration(3000)
    .fromTo('color', 'black', 'red')
    .iterations(1)
    .play();
    // para que se salga el mensaje de toast
    this.deletePedido(id);
    this.showToast('peticion Rechazada');
  }

  deletePedido(id){
    this.db.deletePedido(id).then(async (res) => {
    });
  }



  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        console.log('fetch:'+this.db.fetchPedido());
        console.log('getpedido:'+this.db.getPedido());
        this.db.fetchPedido().subscribe(item => {
          this.data = item;
          console.log('data: '+this.data);
        });
      }
    });
  }
}
