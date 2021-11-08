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

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
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

  //  * Add pedido
  addPedido(id_conductor, nombrePedido,destino,hora) {
    // eslint-disable-next-line prefer-const
    let data = [id_conductor, nombrePedido,destino,hora];
    // ! generar autoinclementable
    return this.storage.executeSql('INSERT INTO pedidotable VALUES (2,?,?,?,?,0)', data)
    .then(res => {
      this.getPedido();
    });
  }


  getConductor(id): Promise<Conductor> {
    return this.storage.executeSql('SELECT * FROM conductortable WHERE id_conductor = ?', [id]).then(res => {
      return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            id_conductor: res.rows.item(0).id_conductor,
            conductor: res.rows.item(0).conductor,
            costo: res.rows.item(0).costo,
            salida: res.rows.item(0).salida,
            entrada: res.rows.item(0).entrada
      };
    });
  }

  // * Update
  updateClave(clave, name) {
    return this.storage.executeSql(`UPDATE usuariotable SET clave = ? WHERE usuname = ${name}`, clave)
    .then(data => {
      this.getUsuario();
    });
  }

  // Delete
  async deletePedido(id) {
    const _ = await this.storage.executeSql('DELETE FROM pedidotable WHERE id_pedido = ?', [id]);
    this.getPedido();
  }
}
