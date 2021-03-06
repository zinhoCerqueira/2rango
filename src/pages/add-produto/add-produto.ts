import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name :'add-produto'
}
)
@Component({
  selector: 'page-add-produto',
  templateUrl: 'add-produto.html',
})
export class AddProdutoPage {

  uid : string;
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder: FormBuilder,
              public storage: Storage,
              public db: AngularFireDatabase) {

              this.registerForm = this.formbuilder.group({
                nomeProduto: [null, [Validators.required, Validators.minLength(3)]],
                categoria: [null, [Validators.required, Validators.minLength(3)]],
                descricao: [null, [Validators.required, Validators.minLength(3)]],
                disponivel: [null, [Validators.required]],
                preco: [null, [Validators.required]],
                uidVendedor : [null]
              })
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) => {
      if(resolve.length > 0){
        this.uid = resolve;
      }
      else{
        console.log("essa porra é lenta pacarai")
      }
    })
  }
/// pera
  enviarProduto(){
    this.registerForm.patchValue({uidVendedor : this.uid})
    this.db.database.ref('/Produto').push(this.registerForm.value)
    .then(() => {
      console.log('Salvou');
      this.navCtrl.setRoot('HomePage');
    })
  }

 

}
