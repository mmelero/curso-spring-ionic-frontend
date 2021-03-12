import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()  
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nav: any;

  constructor(public navCtrl: NavController) {


  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }
 

}
