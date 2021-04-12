import { Component} from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.DTO';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html'

})
export class ProdutosPage {
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoservice: ProdutoService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoservice.findByCategoria(categoria_id, this.page, 10)
      .subscribe(Response => {
        let start = this.items.length;
        this.items = this.items.concat(Response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      }
      );
  }
  loadImageUrls(start: number, end: number){
    for(var i = start; i <= end; i++){
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

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde......"
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doLoadData(event) {
    this.page ++;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
  

}
