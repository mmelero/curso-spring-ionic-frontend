import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/Cliente.DTO';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public stroage: StorageService,
              public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.stroage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(Response =>{
          this.cliente = Response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(Response => {
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        },
        error => {});
  }

}
