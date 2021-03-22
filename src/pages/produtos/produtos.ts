import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.DTO';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoservice: ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('categoria: '+ this.navParams.get('categoria_id'));
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoservice.findByCategoria(categoria_id)
      .subscribe(Response => {
        this.items = Response['content'];
      },
      error => {}
      );
  }

}
