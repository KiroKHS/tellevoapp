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
  cambiardireccion(){
    this.db.updateDireccion(this.user.direccion);
  }


  ngOnInit() {
  }

}
