import { itemPedidoDTO } from "./item-pedido.DTO";
import { PagamentoDTO } from "./pagamento.DTO";
import { refDTO } from "./ref.DTO";

export interface PedidoDTO{
    cliente : refDTO;
    enderecodeEntrega : refDTO;
    pagamento : PagamentoDTO;
    itens : itemPedidoDTO[];
}