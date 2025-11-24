import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clientes } from '../../_shared/clientes';
import { clientesModel } from '../../../model/clientes';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add implements OnInit {

  _form!: FormGroup;
  title = 'Adicionar Cliente';
  isAdd = true;
  editData!: clientesModel;

  constructor(
    private service: Clientes,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<Add>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._form = this.builder.group({
      id: [{ value: null, disabled: true }],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
    });

    const clienteId = Number(this.data?.id);
    if (!isNaN(clienteId)) {
      this.isAdd = false;
      this.title = 'Editar Cliente';
      this.service.Get(clienteId).subscribe({
        next: (item) => {
          this.editData = { ...item, id: Number(item.id) };
          this._form.patchValue(this.editData);
        },
        error: (err) => console.error('Erro ao carregar cliente:', err)
      });
    }
  }

  salvar() {
    if (!this._form.valid) return;

    const formValue = this._form.getRawValue();
    const cliente: clientesModel = { ...formValue, id: this.isAdd ? 0 : this.editData.id };

    if (this.isAdd) {
      this.service.Getall().subscribe(list => {
        const maxId = list.length ? Math.max(...list.map(c => Number(c.id))) : 0;
        cliente.id = maxId + 1;
        this.service.Create(cliente).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Erro ao criar cliente:', err)
        });
      });
    } else {
      this.service.Update(cliente).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao atualizar cliente:', err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
