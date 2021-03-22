export interface ProdutoDTO{
    id: string;
    nome: string;
    preco: number;
    // ? campo não é necessario ser preenchido.
    imageUrl?: string;
}