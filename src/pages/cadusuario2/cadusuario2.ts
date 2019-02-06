import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';


@IonicPage({
  name : 'cad2'
})
@Component({
  selector: 'page-cadusuario2',
  templateUrl: 'cadusuario2.html',
})
export class Cadusuario2Page {

  registerForm : FormGroup;
  uid : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public db: AngularFireDatabase,
    public storage: Storage) {

    this.registerForm = this.formbuilder.group({
      nomeNegocio : [null, [Validators.required , Validators.minLength(3)]],
      telefone : [null, [Validators.required , Validators.minLength(3)]],
      endereco : [null, [Validators.required , Validators.minLength(3)]],
      categoria : [null, [Validators.required , Validators.minLength(3)]],
      limiteDistancia : [null, [Validators.required]],
      valorFrete : [null, [Validators.required]],
      nomeRepresentante : [null, [Validators.required , Validators.minLength(3)]],
      sexo : [null, [Validators.required]],
      formaPagamento : [null, [Validators.required]],
      uidVendedor : [null]
    })
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) => {
      if(resolve.length > 0){
        this.uid = resolve;
        console.log(this.uid);
      }
      else{
        console.log("essa porra é lenta pacarai")
      }
    })
  }

  enviarConta(){
    this.registerForm.patchValue({uidVendedor : this.uid})
    this.db.database.ref('/Vendedor').push(this.registerForm.value)
    .then(() => {
      console.log('Salvou');
      this.navCtrl.setRoot('HomePage');
    })
  }
    
  }

