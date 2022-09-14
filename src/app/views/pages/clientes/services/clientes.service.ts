import { ClienteModel } from './../../../../Models/cliente.model';
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
}
