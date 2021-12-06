import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[Router],
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Prueba Login',()=> {
    expect(component.loginTest('sett','mami')).toBeTruthy();
    //si sale bien debe dar verdadero
  });
  it('Capturando Error',()=> {
    expect(component.loginTest('sett','dinero')).toBeFalsy();
    //si sale bien debe dar verdadero
  });

});
