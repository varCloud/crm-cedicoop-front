import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TipoServiciosModel } from '../../../../Models/tipoServicio.model'

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {
  constructor( private _httpClient: HttpClient ) { }
  public getTipoServicio(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSERVICIOS_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let tipoServicio: Array<TipoServiciosModel> = new Array<TipoServiciosModel>()
        data.forEach(element => {
          tipoServicio.push(new TipoServiciosModel(element))
        });
        return tipoServicio
      })
    )
  }
  public postTipoServicio(tipoServicio: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSERVICIOS_URL}`,tipoServicio)
    .pipe(
      retry(1),
      map((data: any)=> {
        let tipoServicio: TipoServiciosModel;
        tipoServicio = new TipoServiciosModel(data);
        return tipoServicio;
      })
    )
  }
  public putTipoServicio(tipoServicio: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSERVICIOS_URL}`, tipoServicio)
  }
  public deleteTipoServicio(tipoServicio: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idTipoServicio: tipoServicio.idTipoServicio
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_TIPOSERVICIOS_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_TIPOSERVICIOS_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
