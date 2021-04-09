import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
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
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoservice.findByCategoria(categoria_id)
      .subscribe(Response => {
        this.items = Response['content'];
        this.loadImageUrls();
      },
      error => {}
      );
  }

  loadImageUrls(){
    for(var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoservice.getSmallimageFromBucket(item.id)
      .subscribe(Response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        erro => {});
    }
  }

  showDetail(produto_id: string ){
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

}
