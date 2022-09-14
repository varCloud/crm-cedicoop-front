import { ClienteModel } from './../../../../Models/cliente.model';
import { TipoClienteModel } from './../../../../Models/tipoCliente.model';
import { retry, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from './../../../../core/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _httpClient: HttpClient) { 
  }

  public getClientes(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let clientes: Array<ClienteModel> = new Array<ClienteModel>()
        data.forEach(element => {
          clientes.push(new ClienteModel(element))
        });
        return clientes;
      })
    )
  }

  public postClientes(cliente: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CLIENTES_URL}`,cliente)
  }

  public getTipoClientes(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOCLIENTES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let TipoClientes: Array<TipoClienteModel> = new Array<TipoClienteModel>()
        data.forEach(element => {
          TipoClientes.push(new TipoClienteModel(element))
        });
        return TipoClientes;
      })
    )
  }
}
