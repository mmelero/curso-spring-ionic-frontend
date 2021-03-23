import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.DTO";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{
    constructor(public storage: StorageService){

    }

    createorClear() : Cart{
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart{
        let cart = this.storage.getCart();
        if(cart == null){
            cart = this.createorClear();
        }
        return cart;
        
    }

    addProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
 
    }
}