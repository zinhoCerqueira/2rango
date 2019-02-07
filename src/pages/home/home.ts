import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddProdutoPage } from '../add-produto/add-produto';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProdutoPage } from '../produto/produto';
import { PendentesPage } from '../pendentes/pendentes';


@IonicPage({
  name : 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  list = [];
  uid : string;
  finalList = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage : Storage,
              public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) => {
      if(resolve.length > 0){
        this.uid = resolve;
        this.getLista();
      }
      else{
        console.log("essa porra é lenta pacarai")
      }
    })
  }

  openAddProduto(){
    this.navCtrl.push(AddProdutoPage);
  }

  openProduto(item: any){
    this.navCtrl.push(ProdutoPage, {data : item});
    console.log(item);
  }

  getLista(){
    let listaDB = this.db.database.ref('/Produto');
    const query = listaDB.orderByChild('uidVendedor').equalTo(this.uid);
    query.on('value', (snapshot) => {
      this.list = snapshot.val();

      let keys = Object.keys(this.list)
      for(let i=0; i<keys.length; i++){
        this.finalList.push(this.list[keys[i]]);
      }

    })
  }

  pendentes(){
    this.navCtrl.push(PendentesPage);
  }
}
