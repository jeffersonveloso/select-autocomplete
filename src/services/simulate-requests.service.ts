import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SimulateRequestsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Cache-Control': 'no-cache,max-age=<1>,no-store',
    }),
  };
  constructor(public httpClient: HttpClient) {}

  async findClients({
    searchText = '',
    companyId,
    page = 1,
    limit = 30,
  }: {
    searchText?: string;
    companyId: number;
    page: number;
    limit: number;
  }) {
    try {
      return await this.httpClient
        .post<any>(
          `${environment.urlBaseApi}/clients`,
          {
            searchText,
            companyId,
            page,
            limit,
          },
          this.httpOptions
        )
        .toPromise();
    } catch (error) {
      throw new Error(`Não foi possível buscar os clientes desta empresa.`);
    }
  }

  async findPaymentMethods({
    searchText = '',
    companyId,
    page = 1,
    limit = 30,
  }: {
    searchText?: string;
    companyId: number;
    page: number;
    limit: number;
  }) {
    try {
      return await this.httpClient
        .post<any>(
          `${environment.urlBaseApi}/payment-methods`,
          {
            searchText,
            companyId,
            page,
            limit,
          },
          this.httpOptions
        )
        .toPromise();
    } catch (error) {
      throw new Error(
        `Não foi possível buscar os métodos de pagamento desta empresa.`
      );
    }
  }
}
