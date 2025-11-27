
export interface servicosModel {
  id: number;
  clienteId: number;   
  prestadorId: number; 
  descricao: string;
  inicio: string;
  fim: string;
  ramo: string;

  clienteNome?: string;
  prestadorNome?: string;
}
