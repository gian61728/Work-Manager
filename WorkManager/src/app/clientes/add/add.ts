import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clientes } from '../../_shared/clientes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { clientesModel } from '../../../model/clientes';
import { iterator } from 'rxjs/internal/symbol/iterator';

@Component({
  selector: 'app-add',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;
  dialogata: any;
  title = 'Add Clientes';
  isadd = true;
  editata!: clientesModel;

  constructor(private service: Clientes, private builder: FormBuilder, private ref: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.dialogata = this.data;
    if (this.dialogata.id > 0) {
      this.title = 'Edit Clientes';
      this.isadd = false;
      this.service.Get(this.dialogata.id).subscribe(item => {
        this.editata = item;
        this._form.setValue({
          id: this.editata.id,
          name: this.editata.nome,
          idade: this.editata.idade,
          telefone: this.editata.telefone,
          cpf: this.editata.cpf,
          rg: this.editata.rg
        })
      })
    }
    this._form = this.builder.group({
      id: this.builder.control({ disabled: true, value: 0 }),
      nome: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      idade: this.builder.control('', Validators.required),
      telefone: this.builder.control('', Validators.required),
      cpf: this.builder.control('', Validators.required),
      rg: this.builder.control('', Validators.required),

    })
  }
  ngOnDestroy(): void {

  }

  close() {
    this.ref.close();
  }
  salvar() {
    if (this._form.valid) {
      let _data: clientesModel = {
        id: this._form.value.id as number,
        nome: this._form.value.nome as string,
        idade: this._form.value.idade as string,
        telefone: this._form.value.telefone as string,
        cpf: this._form.value.cpf as string,
        rg: this._form.value.rg as string
      }
      if (this.isadd){
      this.service.Create(_data).subscribe(item => {
        alert('Salvo.')
        this.close();
      })
    } else {
      _data.id=this._form.getRawValue().id;
      this.service.Update(_data).subscribe(item => {
        alert('Atualizado')
        this.close();
      })
    }
    }
  }

}
