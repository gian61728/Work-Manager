import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prestadoresModel } from '../../model/prestadores';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Prestadores {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  Getall() {
    return this.http.get<prestadoresModel[]>(`${this.apiBaseUrl}/prestadores`);
  }

  Get(id: number) {
    return this.http.get<prestadoresModel>(`${this.apiBaseUrl}/prestadores/${id}`);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/prestadores/${id}`);
  }

  Update(data: prestadoresModel) {
    return this.http.put<prestadoresModel>(`${this.apiBaseUrl}/prestadores/${data.id}`, data);
  }

  Create(data: Omit<prestadoresModel, 'id'>) {
    return this.http.post<prestadoresModel>(`${this.apiBaseUrl}/prestadores`, data);
  }
}
