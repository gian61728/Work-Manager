import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Clientes } from '../../_shared/clientes';
import { clientesModel } from '../../../model/clientes';
import { Subscription } from 'rxjs';
import { Add } from '../add/add';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit, OnDestroy {

  _list: clientesModel[] = [];
  subs = new Subscription();
  displayedColumns: string[] = ['id', 'nome', 'idade', 'telefone', 'cpf', 'rg', 'action'];
  dataSource!: MatTableDataSource<clientesModel>;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private service: Clientes, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadClientes() {
    const sub = this.service.Getall().subscribe(items => {
      this._list = items;
      this.dataSource = new MatTableDataSource(this._list);
    });
    this.subs.add(sub);
  }

  refreshTable() {
    const sub = this.service.Getall().subscribe(items => {
      this._list = items;
      this.dataSource.data = this._list;
      this.table.renderRows();
    });
    this.subs.add(sub);
  }

  addCliente() {
    this.openDialog(null);
  }

  editCliente(cliente: clientesModel) {
    this.openDialog(cliente);
  }

  deleteCliente(id: number) {
    if (confirm('Deseja realmente deletar este cliente?')) {
      this.service.Delete(id).subscribe(() => {
        alert('Cliente deletado.');
        this.refreshTable();
      });
    }
  }

  private openDialog(cliente: clientesModel | null) {
    const dialogRef = this.dialog.open(Add, {
      width: '40%',
      data: cliente ? { id: cliente.id } : null
    });

    dialogRef.afterClosed().subscribe(changed => {
      if (changed) this.refreshTable();
    });
  }
}
