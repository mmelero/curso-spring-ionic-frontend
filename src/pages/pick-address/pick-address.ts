import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.DTO';
import { PedidoDTO } from '../../models/pedido.DTO';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido : PedidoDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService,
              public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(Response =>{
          this.items = Response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: Response['id']},
            enderecodeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
          if(error.status == 500){
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else{
      this.navCtrl.setRoot('HomePage');
      }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecodeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }

}
