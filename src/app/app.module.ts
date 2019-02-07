import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { environment} from '../environments/environment';
import { AngularFireAuth} from '@angular/fire/auth';
import { IonicStorageModule} from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddProdutoPage } from '../pages/add-produto/add-produto';


import { MyApp } from './app.component';
import { ProdutoPage } from '../pages/produto/produto';
import { PendentesPage } from '../pages/pendentes/pendentes';
import { DetalheProdutoPage } from '../pages/detalhe-produto/detalhe-produto';


@NgModule({
  declarations: [
    MyApp,
    AddProdutoPage,
    ProdutoPage,
    PendentesPage,
    DetalheProdutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddProdutoPage,
    ProdutoPage,
    PendentesPage,
    DetalheProdutoPage
  ],
  providers: [
    StatusBar,
    AngularFireAuth,
    AngularFireDatabase,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
