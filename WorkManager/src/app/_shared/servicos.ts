import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicosModel } from '../../model/servicos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Servicos {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  Getall() {
    return this.http.get<servicosModel[]>(`${this.apiBaseUrl}/servicos`);
  }

  Get(id: number) {
    return this.http.get<servicosModel>(`${this.apiBaseUrl}/servicos/${id}`);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/servicos/${id}`);
  }

  Update(data: servicosModel) {
    return this.http.put<servicosModel>(`${this.apiBaseUrl}/servicos/${data.id}`, data);
  }

  Create(data: Omit<servicosModel, 'id'>) {
    return this.http.post<servicosModel>(`${this.apiBaseUrl}/servicos`, data);
  }
}
