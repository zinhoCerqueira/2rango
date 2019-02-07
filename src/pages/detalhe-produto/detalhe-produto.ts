import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the DetalheProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-produto',
  templateUrl: 'detalhe-produto.html',
})
export class DetalheProdutoPage {

  x = this.navParams.get('data');
  list;
  nomeCliente;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheProdutoPage');
    this.nomeCliente = this.getCliente(this.x);
  }

  getCliente(uidUsuario){
    let listaDB = this.db.database.ref('/Cliente');
    const query = listaDB.orderByChild('uidUsuario').equalTo(this.x.uidUsuario);
    let user;
    query.on('value', (snapshot) => {
      this.list = snapshot.val();
      if(this.list){
        let keys = Object.keys(this.list)
        user = this.list[keys[0]];
      }

    })
    return user.nomePessoa;
  }

}
