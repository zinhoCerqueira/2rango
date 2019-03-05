import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';


@IonicPage({
  name:'cad1'
})
@Component({
  selector: 'page-cadusuario1',
  templateUrl: 'cadusuario1.html',
})
export class Cadusuario1Page {
  
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder: FormBuilder,
              public afAufh : AngularFireAuth,
              public alertCtrl : AlertController
              ) 
              {
  this.registerForm = this.formbuilder.group({
    email: [null, [Validators.required, Validators.minLength(7)]],
    senha: [null, [Validators.required, Validators.minLength(6)]],
    confirmSenha: [null, [Validators.required, Validators.minLength(6)]],
    cpf: [null, [Validators.required, Validators.minLength(6)]]
  })
}

enviarConta(){
              this.afAufh.auth.createUserWithEmailAndPassword(
              this.registerForm.value.email, 
              this.registerForm.value.senha)
  .then((response) => {
    this.presentAlert('Usuário', 'Primeiro passo concluido.');
    this.navCtrl.setRoot('cad2');
  })
  .catch((error) => {
    if(error.code == 'auth/email/already-in-use'){
      this.presentAlert('Erro', 'E-mail já cadastrado.');
    }
  });
}

aprova(){
  if(this.registerForm.value.senha == this.registerForm.value.confirmSenha){
    return false;
  }
  else{
    return true;
  }
}

presentAlert (title: string, subtitle: string){
  let alert = this.alertCtrl.create({
    title: title,
    subTitle : subtitle,
    buttons : ['OK']
  });
  alert.present();
}

}
