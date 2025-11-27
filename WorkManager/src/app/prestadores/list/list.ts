import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Prestadores } from '../../_shared/prestadores';
import { prestadoresModel } from '../../../model/prestadores';
import { AddPrestadores } from '../add/add';

@Component({
  selector: 'app-list-prestador',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './list-prestador.html',
  styleUrls: ['./list-prestador.css']
})
export class ListPrestador implements OnInit, OnDestroy {
  _list: prestadoresModel[] = [];
  subs = new Subscription();
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'cnpj', 'email', 'ramo', 'action'];
  dataSource = new MatTableDataSource<prestadoresModel>();

  @ViewChild(MatTable) table!: MatTable<prestadoresModel>;

  constructor(private service: Prestadores, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPrestadores();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadPrestadores() {
    const sub = this.service.Getall().subscribe({
      next: (items: prestadoresModel[]) => {
        this._list = items;
        this.dataSource.data = this._list;
      },
      error: (err: any) => console.error('Erro ao carregar prestadores:', err)
    });
    this.subs.add(sub);
  }

  refreshTable() {
    this.loadPrestadores();
    this.table?.renderRows();
  }

  addPrestador() {
    this.openDialog(null);
  }

  editPrestador(prestador: prestadoresModel) {
    if (!prestador?.id) return;
    this.openDialog(prestador);
  }

  deletePrestador(id: number) {
    if (!id) return;
    if (confirm('Deseja realmente deletar este prestador?')) {
      this.service.Delete(id).subscribe({
        next: () => this.refreshTable(),
        error: (err: any) => console.error('Erro ao deletar prestador:', err)
      });
    }
  }

  private openDialog(prestador: prestadoresModel | null) {
    const dialogRef = this.dialog.open(AddPrestadores, {
      width: '40%',
      data: prestador ? { id: prestador.id } : null
    });

    dialogRef.afterClosed().subscribe((changed: boolean) => {
      if (changed) this.refreshTable();
    });
  }
}
export { Prestadores };

