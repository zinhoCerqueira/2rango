import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddProdutoPage } from '../add-produto/add-produto';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProdutoPage } from '../produto/produto';


@IonicPage({
  name : 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  uid : string;
  list;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage : Storage,
              public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) => {
      this.uid = resolve;
      this.getLista();
    })
  }

  openAddProduto(){
    this.navCtrl.push(AddProdutoPage);
  }

  openProduto(item: any){
    //this.navCtrl.push(ProdutoPage, {data : item});
    console.log(item);
  }
  
  getLista(){ 
    let listaDB = this.db.database.ref('/Produto').child(this.uid);
    listaDB.on('value', (snapshot) => {
      const itens = snapshot.val();
      if(itens){
        this.list = Object.keys(itens).map(i => itens[i])
        //testando as keys
        //console.log(Object.keys(itens));
      }
      
    })
  
  }

}
