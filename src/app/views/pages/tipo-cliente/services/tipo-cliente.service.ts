import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TipoClienteModel } from 'src/app/Models/tipoCliente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoClienteService {
  constructor( private _httpClient: HttpClient) { }
  public getTipoCliente(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOCLIENTES_URL}`)
      .pipe(
        retry(1)
        , map((data: any) => {
          let tipoCliente: Array<TipoClienteModel> = new Array<TipoClienteModel>()
          data.forEach(element => {
            tipoCliente.push(new TipoClienteModel(element))
          });
          return tipoCliente;
        })
      )
  }
  public postTipoCliente(tipoCliente: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOCLIENTES_URL}`,tipoCliente)
    .pipe(
      retry(1),
      map((data: any)=> {
        let tipoCliente: TipoClienteModel;
        tipoCliente = new TipoClienteModel(data);
        return tipoCliente;
      })
    )
  }
  public putTipoCliente(tipoCliente: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOCLIENTES_URL}`, tipoCliente)
  }
  public deleteTipoCliente(tipoCliente: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idTipoCliente: tipoCliente.idTipoCliente
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOCLIENTES_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_TIPOCLIENTES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
