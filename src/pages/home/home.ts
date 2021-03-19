import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.DTO';
import { AuthService } from '../../services/Auth.Service';

@IonicPage()  
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth: AuthService) {


  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }

    ionViewDidEnter(){
      this.auth.refreshToken()
      .subscribe(Response => {
        this.auth.successfulLogin(Response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error =>{});   
    }
    

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(Response => {
        this.auth.successfulLogin(Response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error =>{});
  }

  Signup(){
    this.navCtrl.push('SignupPage');
  }
}
