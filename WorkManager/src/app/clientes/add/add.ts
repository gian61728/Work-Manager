import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clientes } from '../../_shared/clientes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { clientesModel } from '../../../model/clientes';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;
  dialogData: any;
  title = 'Adicionar Cliente';
  isAdd = true;
  editData!: clientesModel;

  constructor(
    private service: Clientes,
    private builder: FormBuilder,
    private ref: MatDialogRef<Add>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this._form = this.builder.group({
      id: this.builder.control({ disabled: true, value: null }),
      nome: this.builder.control('', [Validators.required, Validators.minLength(3)]),
      idade: this.builder.control('', Validators.required),
      telefone: this.builder.control('', Validators.required),
      cpf: this.builder.control('', Validators.required),
      rg: this.builder.control('', Validators.required),
    });

    this.dialogData = this.data;

    // Editando
    if (this.dialogData && this.dialogData.id != null) {
      this.title = 'Editar Cliente';
      this.isAdd = false;

      this.service.Get(this.dialogData.id).subscribe(item => {
        this.editData = {
          ...item,
          id: Number(item.id) // garante que o id seja number
        };

        // Preenche o formulário
        this._form.patchValue({
          id: this.editData.id,
          nome: this.editData.nome,
          idade: this.editData.idade,
          telefone: this.editData.telefone,
          cpf: this.editData.cpf,
          rg: this.editData.rg
        });
      });
    }
  }

  ngOnDestroy(): void {}

  close() {
    this.ref.close(false); 
  }

  salvar() {
    if (!this._form.valid) return;

    if (this.isAdd) {
      // Criar cliente
      this.service.Getall().subscribe(list => {
        const numericIds = list.map(c => Number(c.id));
        const maxId = numericIds.length ? Math.max(...numericIds) : 0;

        const newData: clientesModel = {
          id: maxId + 1,
          nome: this._form.value.nome,
          idade: this._form.value.idade,
          telefone: this._form.value.telefone,
          cpf: this._form.value.cpf,
          rg: this._form.value.rg
        };

        this.service.Create(newData).subscribe({
          next: () => {
            alert('Cliente salvo.');
            this.ref.close(true);
          },
          error: err => console.error(err)
        });
      });
    } else {
      // Editar cliente
      const updatedData: clientesModel = {
        id: this.editData.id, // garante número
        nome: this._form.value.nome,
        idade: this._form.value.idade,
        telefone: this._form.value.telefone,
        cpf: this._form.value.cpf,
        rg: this._form.value.rg
      };

      this.service.Update(updatedData).subscribe({
        next: () => {
          alert('Cliente atualizado.');
          this.ref.close(true);
        },
        error: err => console.error(err)
      });
    }
  }
}
