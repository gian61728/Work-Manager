import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clientesModel } from '../../model/clientes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Clientes {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  Getall() {
    return this.http.get<clientesModel[]>(`${this.apiBaseUrl}/clientes`);
  }

  Get(id: number) {
    return this.http.get<clientesModel>(`${this.apiBaseUrl}/clientes/${id}`);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/clientes/${id}`);
  }

  Update(data: clientesModel) {
    return this.http.put<clientesModel>(`${this.apiBaseUrl}/clientes/${data.id}`, data);
  }

  Create(data: Omit<clientesModel, 'id'>) {
    return this.http.post<clientesModel>(`${this.apiBaseUrl}/clientes`, data);
  }
}
