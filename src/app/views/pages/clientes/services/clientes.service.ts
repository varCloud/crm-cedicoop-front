import { ClienteModel } from './../../../../Models/cliente.model';
import { retry, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from './../../../../core/constants/constants';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private _refresh = new Subject<void>();
  constructor(private _httpClient: HttpClient) {
  }

  get refresh() {
    return this._refresh;
  }

  public getClientes() {
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`)
      .pipe(
        retry(1),
        map((data: any) => {
          let clientes: Array<ClienteModel> = new Array<ClienteModel>()
          data.forEach(element => {
            clientes.push(new ClienteModel(element))
          });
          return clientes;
        }),
        tap(() => {
            this._refresh.next()
        }),
        )
  }

  public postClientes(cliente: any) {
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`, cliente)
      .pipe(
        retry(1),
        map((data: any) => {
          let cliente: ClienteModel;
          cliente = new ClienteModel(data);
          return cliente;
        }),
        tap(() => {
          this._refresh.next();
        }),
      )
  }

  public putCliente(cliente: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`, cliente)
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      )
  }

  public deleteCliente(cliente: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idCliente: cliente.idCliente
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`, options)
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      )
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_CLIENTES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }

}
