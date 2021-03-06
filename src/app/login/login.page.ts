import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from './../service/db.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // * creando variables usuarios
  // eslint-disable-next-line @typescript-eslint/quotes
  user = {nombre: "", clave: ""};
  constructor(private router: Router,
              public toast: ToastController,
              private db: DbService,
              private storage: Storage
    ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  data: any[]=[];

  async ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.data = item;
          console.log(this.data);
        });
      }
    });
    await this.storage.create();
  }


  async showToast() {
    const toast = await this.toast.create({
      message: 'campos vacios o incorrectos',
      duration: 5000
    });
    toast.present();
  }

  async login(){
    // capturando datos del input
    // eslint-disable-next-line prefer-const
    let navExtras: NavigationExtras = {
      state: {user: this.user}
    };let contador = 0;
    if (this.user.nombre.length > 0){

      // eslint-disable-next-line @typescript-eslint/naming-convention
      for (const Data of this.data){
        console.log(`Nombre: ${Data.nombre}`,'clave: '+Data.clave);
        if(this.user.clave === Data.clave && this.user.nombre === Data.usuname){
          // * validando aceso
          contador = 1;
          this.storage.set('logueado','1');
          this.storage.set('username',Data.nombre);
          this.storage.set('userid',Data.id);
          // * re direcciona al usuario segun su moviliaria
          if(Data.moviliaria === 0){
            this.storage.set('casa',Data.direccion);
            this.router.navigate(['/home'],navExtras);
          }
          else{if (Data.moviliaria === 1){this.router.navigate(['/peticion/']);}}
        }
      }
      if (contador === 0) {
        this.showToast2('clave o usuario incorrecto');
      }

    }else{
      this.showToast();
      this.storage.set('logueado','0');
    }
}
async showToast2(texto: string) {
  const toast = await this.toast.create({
    message: texto,
    duration: 5000
  });
  toast.present();
}

loginTest(usuario, clave){
  if (this.user.nombre.length > 0){
    // eslint-disable-next-line @typescript-eslint/naming-convention
    for (const Data of this.data){
      if(clave === Data.clave && usuario === Data.usuname){
        return 1;
      }else{
        return 0;
      }
    }

  }else{
    return false;
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
