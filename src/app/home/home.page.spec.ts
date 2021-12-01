import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Bienvenido correcto', () => {
    let dom = fixture.debugElement.nativeElement;
    component.data ={
      nombre: 'test',clave: 'test'
    }
    let titulo =  'Bienvenido '+ component.data.nombre
    //deberia dar titulo 'Bienvenido [nombre]'
    expect(dom.querySelector("ion-label").textContent).toContain(titulo);
  });
  
});
