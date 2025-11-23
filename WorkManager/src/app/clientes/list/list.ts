import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { Clientes } from '../../_shared/clientes';
import { clientesModel } from '../../../model/clientes';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit, OnDestroy {

  _list: clientesModel[] = [];
  subs = new Subscription();
  //display vai mostrar a parte de cima com os nomes de cada tabela
  displayHeaders = ['id', 'nomes', 'address']
  datasource!: MatTableDataSource<clientesModel>;
  constructor(private service: Clientes) {

  }

  GetallList() {
    let _sub = this.service.Getall().subscribe(item => {
      this._list = item;
      this.datasource = new MatTableDataSource(this._list);
    });
    this.subs.add(_sub);
  }

  ngOnInit(): void {
    this.GetallList();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
