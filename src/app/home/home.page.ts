/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from './../service/db.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // data almacena el dato del login
  data: any;

  mainForm: FormGroup;
  ddata: any[]=[];

  constructor(
    private navCTRL: NavController,
    private activeroute: ActivatedRoute,
    private router: Router,
    public menu: MenuController,
    private db: DbService,
    private toast: ToastController,
    public formBuilder: FormBuilder,
    private storage: Storage
  )

  // capturando datos del login
  {this.activeroute.queryParams.subscribe(params =>{
    this.data = this.router.getCurrentNavigation().extras.state.user;
    console.log(this.data);
  });
}

peticionPage(){
  //re direcciona al usuario
  this.router.navigate(['/peticion',this.data]);
};
//creando funcion para ver conductores
verConductor(conductor: any){
//guardando datos
  const nav: NavigationExtras={
    queryParams:{
      conductor: JSON.stringify(conductor)
    }
  };
  this.navCTRL.navigateForward(['conductor/'],nav);
}

logout(){
  this.storage.set('logueado','0');//borando item storage
  this.router.navigate(['login/']);
}

ngOnInit() {
  this.db.dbState().subscribe((res) => {
    if(res){
      this.db.fetchSongs().subscribe(item => {
        this.ddata = item;
      });
    }
  });
}

};
