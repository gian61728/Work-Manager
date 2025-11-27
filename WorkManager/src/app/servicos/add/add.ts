import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Servicos } from '../../_shared/servicos';
import { Clientes } from '../../_shared/clientes';
import { Prestadores } from '../../_shared/prestadores';

import { servicosModel } from '../../../model/servicos';
import { clientesModel } from '../../../model/clientes';
import { prestadoresModel } from '../../../model/prestadores';

@Component({
  selector: 'app-add-servicos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-servicos.html',
  styleUrls: ['./add-servicos.css']
})
export class Addservicos implements OnInit {

  _form!: FormGroup;
  title = 'Adicionar Serviço';
  isAdd = true;
  editData!: servicosModel;

  clientes: clientesModel[] = [];
  prestadores: prestadoresModel[] = [];

  constructor(
    private service: Servicos,
    private clientesService: Clientes,
    private prestadoresService: Prestadores,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<Addservicos>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    // Formulário
    this._form = this.builder.group({
      id: [{ value: null, disabled: true }],
      clienteId: ['', Validators.required],
      prestadorId: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      inicio: ['', Validators.required],
      fim: ['', Validators.required],
      ramo: ['', Validators.required]
    });

  
    this.clientesService.Getall().subscribe(res => this.clientes = res);
    this.prestadoresService.Getall().subscribe(res => this.prestadores = res);

   
    const servicosId = Number(this.data?.id);
    if (!isNaN(servicosId)) {
      this.isAdd = false;
      this.title = 'Editar Serviço';

      this.service.Get(servicosId).subscribe({
        next: (item) => {
          this.editData = { ...item, id: Number(item.id) };
          this._form.patchValue(this.editData);
        },
        error: (err) => console.error('Erro ao carregar serviço:', err)
      });
    }
  }

  salvar() {
    if (!this._form.valid) return;

    const formValue = this._form.getRawValue();
    const servicos: servicosModel = {
      ...formValue,
      id: this.isAdd ? '0' : this.editData.id
    };

    if (this.isAdd) {
      this.service.Getall().subscribe(list => {
        const maxId = list.length ? Math.max(...list.map(s => Number(s.id))) : 0;
        servicos.id = maxId + 1;

        this.service.Create(servicos).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Erro ao criar serviço:', err)
        });
      });
    } else {
      this.service.Update(servicos).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao atualizar serviço:', err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
