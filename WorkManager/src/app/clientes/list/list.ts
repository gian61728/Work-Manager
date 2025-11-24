import { Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
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
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})

export class List implements OnInit, OnDestroy {

  _list: clientesModel[] = [];
  subs = new Subscription();
  //display vai mostrar a parte de cima com os nomes de cada tabela
  displayHeaders = ['id', 'nome', 'idade', 'telefone','cpf','rg','action']
  datasource!: MatTableDataSource<clientesModel>;
  @ViewChild(MatTable) table !:MatTable<any>
  constructor(private service: Clientes,private dialog:MatDialog) {

  }

  UpdateList() {
    let _sub = this.service.Getall().subscribe(item => {
      this._list = item;
      this.datasource.data =this._list;
      this.table.renderRows();
    });
    this.subs.add(_sub);
  }

  ngOnInit(): void {
    this.GetallList();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  add(){
    this.openPopup("0");
  }
//janela que vai ser aberta
  openPopup(id:string){
    this.dialog.open(Add,{
      width: '40%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms'
      data:{
        id
      }
    }).afterClosed().subscribe(s =>{
     
      this.UpdateList();
    })
  }
  Edit(id:any){
    this.openPopup(id);
  }
  Delete(id:any){

  }
}
