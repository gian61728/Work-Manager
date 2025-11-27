import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Servicos } from '../../_shared/servicos';
import { servicosModel } from '../../../model/servicos';

import { Clientes } from '../../_shared/clientes';
import { clientesModel } from '../../../model/clientes';

import { Prestadores } from '../../_shared/prestadores';
import { prestadoresModel } from '../../../model/prestadores';

import { Addservicos } from '../add/add';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListServico implements OnInit, OnDestroy {
  _list: servicosModel[] = [];
  subs = new Subscription();
  displayedColumns: string[] = ['id', 'clienteNome', 'prestadorNome', 'descricao', 'inicio', 'fim', 'ramo', 'action'];
  dataSource = new MatTableDataSource<servicosModel>();

  clientes: clientesModel[] = [];
  prestadores: prestadoresModel[] = [];

  @ViewChild(MatTable) table!: MatTable<servicosModel>;

  constructor(
    private service: Servicos,
    private clientesService: Clientes,
    private prestadoresService: Prestadores,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Carrega clientes e prestadores primeiro
    this.loadClientes();
    this.loadPrestadores();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadClientes() {
    const sub = this.clientesService.Getall().subscribe({
      next: (list: clientesModel[]) => {
        this.clientes = list;
        this.tryLoadServicos();
      },
      error: (err) => console.error('Erro ao carregar clientes:', err)
    });
    this.subs.add(sub);
  }

  loadPrestadores() {
    const sub = this.prestadoresService.Getall().subscribe({
      next: (list: prestadoresModel[]) => {
        this.prestadores = list;
        this.tryLoadServicos();
      },
      error: (err) => console.error('Erro ao carregar prestadores:', err)
    });
    this.subs.add(sub);
  }

  // Só carrega serviços quando clientes e prestadores estiverem carregados
  tryLoadServicos() {
    if (this.clientes.length && this.prestadores.length) {
      this.loadServicos();
    }
  }

  loadServicos() {
    const sub = this.service.Getall().subscribe({
      next: (items: servicosModel[]) => {
        
        this._list = items.map(servico => {
          const cliente = this.clientes.find(c => c.id === servico.clienteId);
          const prestador = this.prestadores.find(p => p.id === servico.prestadorId);

          return {
            ...servico,
            clienteNome: cliente ? cliente.nome : 'Desconhecido',
            prestadorNome: prestador ? prestador.nome : 'Desconhecido',
          };
        });

        this.dataSource.data = this._list;
      },
      error: err => console.error('Erro ao carregar serviços:', err)
    });
    this.subs.add(sub);
  }

  refreshTable() {
    this.loadServicos();
    this.table?.renderRows();
  }

  addServico() {
    this.openDialog(null);
  }

  editServico(servico: servicosModel) {
    if (servico?.id === null || servico?.id === undefined) return;
    this.openDialog(servico);
  }

  deleteServico(id: number) {
    if (!id) return;

    if (confirm('Deseja realmente deletar este serviço?')) {
      this.service.Delete(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error('Erro ao deletar serviço:', err)
      });
    }
  }

  private openDialog(servico: servicosModel | null) {
    const dialogRef = this.dialog.open(Addservicos, {
      width: '50%',
      data: servico ? { id: servico.id } : null
    });

    dialogRef.afterClosed().subscribe(changed => {
      if (changed) this.refreshTable();
    });
  }
}
