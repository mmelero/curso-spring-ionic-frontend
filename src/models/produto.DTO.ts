export interface ProdutoDTO{
    id: string;
    nome: string;
    preco: number;
    quantidade: number,
    // ? campo não é necessario ser preenchido.
    imageUrl?: string;
}