import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // data almacena el dato del login
  data: any;
  constructor(
    private navCTRL: NavController,
    private activeroute: ActivatedRoute,
    private router: Router,
    public menu: MenuController,
  )
  // capturando datos del login
  {this.activeroute.queryParams.subscribe(params =>{
    this.data = this.router.getCurrentNavigation().extras.state.user;
    console.log(this.data);
  });
}

//creando funcion para ver conductores
verConductor(conductor:any){
//guardando datos
  let nav:NavigationExtras={
    queryParams:{
      conductor: JSON.stringify(conductor)
    }
  }
  this.navCTRL.navigateForward(['conductor/'],nav);
}
//creando array de conductores

conductores : any =[{
  id:1,
  name: 'juanco ',
  name2: 'coloco',
  direccion: 'maria pinto',
  costo: 1000,
  salicasa: '17:30',saliduoc:'22:00',
  acientos: 3,
  matricula: 'B7FQ',
  imgen: 'https://i.pinimg.com/originals/6c/ad/f5/6cadf5963f3098686d5217f0615ed0c6.jpg',
},
{
  id:2,
  name: 'ana',
  lasname: 'tomia',
  direccion: 'Santiago',
  costo: 4000,
  salicasa: '13:30',saliduoc:'17:30',
  acientos: 2,
  matricula: '9G0A',
  imgen: 'https://i.pinimg.com/originals/20/70/e7/2070e7111fc63410ac6ce4958ab17fd9.jpg',
},
{
  id:3,
  name: 'Elsa',
  lasname: 'Pato',
  direccion: 'bollenar',
  costo: 1200,
  salicasa: '13:30',saliduoc:'17:30',
  acientos: 2,
  matricula: 'N9TT',
  imgen: 'https://i.pinimg.com/originals/4d/17/20/4d1720d541a054e8e5ffc351a0f288fe.jpg',
},

];

}
