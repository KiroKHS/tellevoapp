import { Conductor } from './../service/conductor';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from './../service/db.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //* variables
  perfil: any;
  currentImage: any;
  user: {direccion: any};
  conductor: any;
  constructor(
    private camera: Camera,
    private storage: Storage,
    private db: DbService,

  ) {
    this.db.getPerfil().then(res => {
      this.perfil = res;
      console.log('Perfil: '+this.perfil);
      this.currentImage= this.perfil.avatar;
    });
    console.log('ID: '+ this.perfil.id);
    this.db.getConductor(this.perfil.id).then(res => {
      this.conductor = res;
      console.log(this.conductor);
    });

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.db.updateAvatar(this.currentImage);
    }, (err) => {
      // ! mensaje error
      console.log('Camera error: ' + err);
    });
  }
  async cambiarCosto(costo: number , conductor: number = null){
    if (costo > 0 && costo < 1500 ) {
      if (conductor) {
        this.db.updateCosto(conductor, costo);
      } else {
        const conductor2 = this.perfil.id;
        if (conductor) {
        this.db.updateCosto(await conductor2, costo);
        } else {
          console.log('Error en conductor '+ conductor);
        }
      }
    } else {
      console.log('Error costo: '+costo +' debe ser entre 0, 1500');
    }
  }


  ngOnInit() {
  }

}
