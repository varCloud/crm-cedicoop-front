import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { InteresesModel } from '../../../../Models/intereses.model'
@Injectable({
  providedIn: 'root'
})
export class InteresesService {
  constructor( private _httpClient: HttpClient) { }
  public getIntereses(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INTERESES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let Intereses: Array<InteresesModel> = new Array<InteresesModel>()
        data.forEach(element => {
          Intereses.push(new InteresesModel(element))
        });
        return Intereses
      })
    )
  }
  public postIntereses(Intereses: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INTERESES_URL}`,Intereses)
    .pipe(
      retry(1),
      map((data: any)=> {
        let Intereses: InteresesModel;
        Intereses = new InteresesModel(data);
        return Intereses;
      })
    )
  }
  public putIntereses(Intereses: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INTERESES_URL}`, Intereses)
  }
  public deleteIntereses(Intereses: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idIntereseCliente: Intereses.idIntereseCliente
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INTERESES_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_INTERESES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
