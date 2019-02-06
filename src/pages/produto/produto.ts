import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@IonicPage({
  name : 'ProdutoPage'
})
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  uid : string;
  registerForm: FormGroup;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder: FormBuilder,
              public storage: Storage,
              public db: AngularFireDatabase) {

              let x = this.navParams.get('data');

              this.registerForm = this.formbuilder.group({
                nomeProduto: [x.nomeProduto, [Validators.required, Validators.minLength(3)]],
                categoria: [x.categoria, [Validators.required, Validators.minLength(3)]],
                descricao: [x.descricao, [Validators.required, Validators.minLength(3)]],
                disponivel: [x.disponivel, [Validators.required]],
                preco: [x.preco, [Validators.required]]
              })
                


  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) => {
      this.uid = resolve;
    })
  }

  enviarProduto(){

  }
  

}
