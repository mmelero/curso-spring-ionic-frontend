import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-items';
import { ClienteDTO } from '../../models/Cliente.DTO';
import { EnderecoDTO } from '../../models/endereco.DTO';
import { PedidoDTO } from '../../models/pedido.DTO';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedidoService';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService ) {

    this.pedido = this.navParams.get('pedido');

  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(Response =>{
        this.cliente =  Response as ClienteDTO;
        //console.log(this.pedido.enderecodeEntrega);
        this.endereco = this.findEndereco(this.pedido.enderecodeEntrega.id, Response['enderecos']);
      },
      erro => {
        this.navCtrl.setRoot('HomePage');
      })
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.codpedido = this.extractId(response.headers.get('location'));
        this.cartService.createorClear();

      },
      
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
          
        }
      });
  }

  private extractId(location: string) : string{
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
