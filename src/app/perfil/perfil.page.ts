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
  costo: number;
  conductor: any;

  constructor(
    private camera: Camera,
    private storage: Storage,
    private db: DbService,

  ) {
    const id = this.storage.get('userid');
    this.db.getPerfil().then(res => {
      this.perfil = res;
      console.log('Perfil: '+this.perfil.moviliaria);
      this.currentImage= this.perfil.avatar;
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
  async cambiarCosto(costo: number ){
    if (costo > 500 && costo < 1500 ) {
        this.db.updateCosto(costo);
    }
     else {
      console.log('Error costo: '+costo +' debe ser entre 0, 1500');
    }
  }

  datosconductor(id){
    console.log('ID: '+ id);
    this.db.getConductor(id).then(res => {
      this.conductor = res;
      console.log(this.conductor);
    });
  }


  ngOnInit() {
  }

}
