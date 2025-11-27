
export interface servicosModel {
  id: number;
  clienteId: number;   // Alterado para number
  prestadorId: number; // Alterado para number
  descricao: string;
  inicio: string;
  fim: string;
  ramo: string;

  clienteNome?: string;
  prestadorNome?: string;
}
