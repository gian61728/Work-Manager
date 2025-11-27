import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestadores } from '../../_shared/prestadores';
import { prestadoresModel } from '../../../model/prestadores';

@Component({
  selector: 'app-add-prestador',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-prestador.html'
})
export class AddPrestadores implements OnInit {

  _form!: FormGroup;
  title = 'Adicionar Prestador';
  isAdd = true;
  editData!: prestadoresModel;

  constructor(
    private service: Prestadores,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<AddPrestadores>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._form = this.builder.group({
      id: [{ value: null, disabled: true }],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', Validators.required],
      endereco: ['', Validators.required],
      ramo: ['', Validators.required],
      senha: ['', Validators.required]
    });

    const prestadorId = Number(this.data?.id);
    if (!isNaN(prestadorId)) {
      this.isAdd = false;
      this.title = 'Editar Prestador';
      this.service.Get(prestadorId).subscribe({
        next: (item: prestadoresModel) => {
          this.editData = { ...item };
          this._form.patchValue(this.editData);
        },
        error: (err: any) => console.error('Erro ao carregar prestador:', err)
      });
    }
  }

  salvar() {
    if (!this._form.valid) return;
    const formValue = this._form.getRawValue();
    const prestador: prestadoresModel = { ...formValue, id: this.isAdd ? 0 : this.editData.id };

    if (this.isAdd) {
      this.service.Getall().subscribe((list: prestadoresModel[]) => {
        const maxId = list.length ? Math.max(...list.map(p => Number(p.id))) : 0;
        prestador.id = maxId + 1;
        this.service.Create(prestador).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err: any) => console.error('Erro ao criar prestador:', err)
        });
      });
    } else {
      this.service.Update(prestador).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err: any) => console.error('Erro ao atualizar prestador:', err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
