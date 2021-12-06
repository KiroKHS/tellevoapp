import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';

import { Storage } from '@ionic/storage-angular';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('Titulo Perfil correcto', () => {
    //agarando cosas del html
    const dom = fixture.debugElement.nativeElement;
    const titulo =  'perfil '+ component.perfil.nombre;
    //deberia dar titulo 'perfil [nombre]'
    expect(dom.querySelector('ion-title').textContent).toContain(titulo);
  });
});
