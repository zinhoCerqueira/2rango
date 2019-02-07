import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { DetalheProdutoPage } from '../detalhe-produto/detalhe-produto';

@IonicPage()
@Component({
  selector: 'page-pendentes',
  templateUrl: 'pendentes.html',
})
export class PendentesPage {

  list = [];
  finalList = [];
  uid : string;
  nomeCliente;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public storage : Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendentesPage');
    this.storage.get('user')
    .then((resolve) => {
      if(resolve.length > 0){
        this.uid = resolve;
        this.getLista();
      }
    })
  }

  getLista(){
    let listaDB = this.db.database.ref('/Pendentes');
    const query = listaDB.orderByChild('idVendedor').equalTo(this.uid);
    query.on('value', (snapshot) => {
      this.list = snapshot.val();
      if(this.list){
        let keys = Object.keys(this.list)
        for(let i=0; i<keys.length; i++){
          this.finalList.push(this.list[keys[i]]);
        }
      }

    })
  }

  verPedido(item : any){
    this.navCtrl.push(DetalheProdutoPage, {data : item});
  }

}
