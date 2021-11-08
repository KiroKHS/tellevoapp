import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from './../service/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // creando variables usuarios
  // eslint-disable-next-line @typescript-eslint/quotes
  user = {nombre: "", clave: ""};
  constructor(private router: Router,
              public toast: ToastController,
              private db: DbService,
    ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  data: any[]=[];

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.data = item;
          console.log(this.data);

          // console.log(this.data[0].form('Sett'));
        });
      }
    });
  }


  async showToast() {
    const toast = await this.toast.create({
      message: 'campos vacios o incorrectos',
      duration: 5000
    });
    toast.present();
  }

  login(){
    // capturando datos del input
    // eslint-disable-next-line prefer-const
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };
    if (this.user.nombre.length > 0){
      // eslint-disable-next-line @typescript-eslint/naming-convention
      for (const Data of this.data){
        console.log(`Nombre:${Data.nombre}`,'clave:'+Data.clave);
        if(this.user.clave === Data.clave && this.user.nombre === Data.usuname){
          // * re direcciona al usuario segun su moviliaria
          if(Data.moviliaria === 0){this.router.navigate(['/home'],navExtras);}
          else{if (Data.moviliaria ===1){this.router.navigate(['/peticion/']);}}
        }
      }

    }else{
      this.showToast();
    }
}
// enviar al recuperar contrasenia
  recuperar(){
    // eslint-disable-next-line prefer-const
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };
    //re direcciona al usuario
    this.router.navigate(['/recuperar',navExtras]);
}
}
