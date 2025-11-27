import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clientes } from '../../_shared/clientes';
import { clientesModel } from '../../../model/clientes';
import { Add } from '../add/add';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    RouterLink 
  ],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit, OnDestroy {
  _list: clientesModel[] = [];
  subs = new Subscription();
  displayedColumns: string[] = ['id', 'nome', 'idade', 'telefone', 'cpf', 'rg', 'action'];
  dataSource = new MatTableDataSource<clientesModel>();

  @ViewChild(MatTable) table!: MatTable<clientesModel>;

  constructor(private service: Clientes, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadClientes() {
    const sub = this.service.Getall().subscribe({
      next: (items: clientesModel[]) => {
        this._list = items;
        this.dataSource.data = this._list;
      },
      error: (err: any) => console.error('Erro ao carregar clientes:', err)
    });
    this.subs.add(sub);
  }

  refreshTable() {
    this.loadClientes();
    this.table?.renderRows();
  }

  addCliente() {
    this.openDialog(null);
  }

  editCliente(cliente: clientesModel) {
    if (!cliente?.id) return;
    this.openDialog(cliente);
  }

  deleteCliente(id: number) {
    if (!id) return;

    if (confirm('Deseja realmente deletar este cliente?')) {
      this.service.Delete(id).subscribe({
        next: () => this.refreshTable(),
        error: (err: any) => console.error('Erro ao deletar cliente:', err)
      });
    }
  }

  private openDialog(cliente: clientesModel | null) {
    const dialogRef = this.dialog.open(Add, {
      width: '40%',
      data: cliente ? { id: cliente.id } : null
    });

    dialogRef.afterClosed().subscribe((changed: boolean) => {
      if (changed) this.refreshTable();
    });
  }
}
