
import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TipoSeguimientoModel } from '../../../../Models/tipoSeguimiento.model'

@Injectable({
  providedIn: 'root'
})
export class TipoSeguimientoService {
  constructor( private _httpClient: HttpClient) { }
  public getTipoSeguimiento(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSEGUIMIENTO_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let tipoSeguimiento: Array<TipoSeguimientoModel> = new Array<TipoSeguimientoModel>()
        data.forEach(element => {
          tipoSeguimiento.push(new TipoSeguimientoModel(element))
        });
        return tipoSeguimiento
      })
    )
  }
  public postTipoSeguimiento(tipoSeguimiento: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSEGUIMIENTO_URL}`,tipoSeguimiento)
    .pipe(
      retry(1),
      map((data: any)=> {
        let tipoSeguimiento: TipoSeguimientoModel;
        tipoSeguimiento = new TipoSeguimientoModel(data);
        return tipoSeguimiento;
      })
    )
  }
  public putTipoSeguimiento(tipoSeguimiento: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSEGUIMIENTO_URL}`, tipoSeguimiento)
  }
  public deleteTipoSeguimiento(tipoSeguimiento: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idTipoSeguimiento: tipoSeguimiento.idTipoSeguimiento
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSEGUIMIENTO_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_TIPOSEGUIMIENTO_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
