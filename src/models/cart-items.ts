import { ProdutoDTO } from "./produto.DTO";

export interface CartItem {
    quantidade: number;
    produto: ProdutoDTO;

}