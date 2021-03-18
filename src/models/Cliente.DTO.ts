export interface ClienteDTO{
    id: string;
    nome: string;
    email: string;
    // ? campo não é necessario ser preenchido.
    imageUrl?: string;

}