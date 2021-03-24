import { EstadoDTO } from "./estado.DTO";

export interface CidadeDTO{
    id: string;
    nome: string;
    estado?: EstadoDTO;
}
