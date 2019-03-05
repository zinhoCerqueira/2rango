import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';




@IonicPage({
  name : 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder : FormBuilder,
              public afAuth : AngularFireAuth,
              public alertCtrl : AlertController,
              public storage : Storage) {

    this.loginForm = this.formbuilder.group({
      email : [null, [Validators.required, Validators.email]],
      senha : [null, [Validators.minLength(6), Validators.required]]
    })
  }

  fazerLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.senha)
    .then(
      (response) => {
        this.storage.set('user', response.user.uid)
        .then(() => {
          this.navCtrl.setRoot('HomePage');
        })
      }
    )
    .catch((error) =>  {
      if(error.code == 'auth/wrong-password'){
        this.presentAlert('Erro', 'Senha incorreta.')
        this.loginForm.controls['senha'].setValue(null);
      }
    })
      
    
  }

  presentAlert (title: string, subtitle: string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle : subtitle,
      buttons : ['OK']
    });
    alert.present();
  }

  ionViewCanEnter(){
    this.storage.get('user')
    .then((resolve) => {
      if(resolve.length > 0){
        this.navCtrl.setRoot('HomePage');
      }
      else{
        return true;
      }
    })
    .catch((error) => {
      return true;
    })
  }
}
