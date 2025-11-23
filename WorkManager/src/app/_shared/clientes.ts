import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clientesModel } from '../../model/clientes';

@Injectable({
  providedIn: 'root',
})
export class Clientes {
  //https://special-trout-v69vqjp65v5gfxpw6-3000.app.github.dev/clientes
  apiBaseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }
  // pega os todos do clientes mostrando a tabela por inteira 
  GeTall() {
    return this.http.get<clientesModel[]>(this.apiBaseUrl + '/clientes');
  }

  //pegar os dados do clientes
  Get(id: number) {
   return this.http.get<clientesModel>(this.apiBaseUrl + '/clientes/' + id);
  }
  //deleta os dados do clientes
  Delete(id: number) {
   return this.http.delete(this.apiBaseUrl + '/clientes/' + id);
  }
  //data e os dados meus
  //update dos dados clientes
  Update(data: clientesModel) {
   return this.http.put(this.apiBaseUrl + '/clientes/' + data.id, data);
  }
  // cliar dados clientes
  Create(data: clientesModel) {
   return this.http.post(this.apiBaseUrl + '/clientes', data);
  }
}
