import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clientes } from '../../_shared/clientes';
import { MatDialogRef } from '@angular/material/dialog';
import { clientesModel } from '../../../model/clientes';

@Component({
  selector: 'app-add',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;

  constructor(private service: Clientes, private builder: FormBuilder, private ref:MatDialogRef<Add>) {

  }
  ngOnInit(): void {
    this._form = this.builder.group({
      id: this.builder.control({ disabled: true, value: 0 }),
      nome:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
      idade:this.builder.control('',Validators.required),
      telefone:this.builder.control('',Validators.required),
      cpf:this.builder.control('',Validators.required),
      rg:this.builder.control('',Validators.required),

    })
  }
  ngOnDestroy(): void {

  }

close(){
  this.ref.close();
}
salvar(){
  if(this._form.valid){
    let _data: clientesModel={
      id: this._form.value.id as string,
      nome: this._form.value.nome as string,
      idade: this._form.value.idade as string,
      telefone: this._form.value.telefone as string,
      cpf: this._form.value.cpf as string,
      rg: this._form.value.rg as string
    }
    this.service.Create(_data).subscribe(item=>{
      alert('Salvo.')
      this.close();
    })
  }
}

}
