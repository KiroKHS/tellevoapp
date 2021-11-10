/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Usuario } from './usuario';
import { Conductor } from './conductor';
import { Pedido } from './pedido';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  usuarioList= new BehaviorSubject([]);
  pedidoList= new BehaviorSubject([]);
  conductorList= new BehaviorSubject([]);
  pediList= new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  idadd =3;// ! variable para el uato inclementable
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private stora: Storage,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchSongs(): Observable<Usuario[]> {
    return this.usuarioList.asObservable();
  }
  fetchPedido(): Observable<Pedido[]> {
    return this.pediList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/database.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getUsuario();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list usuarios
  getUsuario(){
    return this.storage.executeSql('SELECT * FROM usuariotable', []).then(res => {
      const items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            usuname: res.rows.item(i).usuname,
            clave: res.rows.item(i).clave,
            nombre: res.rows.item(i).nombre,
            direccion: res.rows.item(i).direccion,
            moviliaria: res.rows.item(i).moviliaria
           });
        }
      }
      this.usuarioList.next(items);
    });
  }
  // Get list pedido
  getPedido(){
    return this.storage.executeSql('SELECT * FROM pedidotable', []).then(res => {
      const items: Pedido[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_pedido: res.rows.item(i).id_pedido,
            id_chofer: res.rows.item(i).id_chofer,
            pasajero: res.rows.item(i).pasajero,
            direccion: res.rows.item(i).direccion,
            hora: res.rows.item(i).hora,
            estado: res.rows.item(i).estado
           });
        }
      }
      this.pediList.next(items);
    });
  }

  //  * Add pedido funciona y se auto inclementa
  addPedido(id_conductor, nombrePedido,destino,hora) {

    // eslint-disable-next-line prefer-const
    let data = [this.idadd,id_conductor, nombrePedido,destino,hora];

    return this.storage.executeSql('INSERT or IGNORE INTO pedidotable VALUES (?,?,?,?,?,0)', data)
    .then(res => {
      this.getPedido();
      this.idadd+=1;
    });
  }

// * retorna datos del conductor
  async getConductor(id): Promise<Conductor> {
    const res = await this.storage.executeSql('SELECT * FROM conductortable WHERE id_conductor = ?', [id]);
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_conductor: res.rows.item(0).id_conductor,
      conductor: res.rows.item(0).conductor,
      costo: res.rows.item(0).costo,
      salida: res.rows.item(0).salida,
      entrada: res.rows.item(0).entrada
    };
  }
// * retorna datos del usuario
  async getPerfil(): Promise<Usuario> {
    const id= await this.stora.get('userid');
    const res = await this.storage.executeSql('SELECT * FROM usuariotable WHERE id = ?', [id]);
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id: res.rows.item(0).id,
      nombre: res.rows.item(0).nombre,
      direccion: res.rows.item(0).direccion,
      usuname: res.rows.item(0).usuname,
      moviliaria: res.rows.item(0).moviliaria,
      clave: res.rows.item(0).clave
    };
  }

  // * Update
  //* arreglado
  async updateClave() {
    const name = await this.stora.get('userpsw');
    const psw = await this.stora.get('newpsw');
    return this.storage.executeSql('UPDATE usuariotable SET clave = ? WHERE usuname = ?', [psw,name])
    .then(() => {
      this.getUsuario();
    });
  }

  // * Delete
  // * funciona
  async deletePedido(id) {
    const _ = await this.storage.executeSql('DELETE FROM pedidotable WHERE id_pedido = ?', [id]);
    this.getPedido();
  }
}
