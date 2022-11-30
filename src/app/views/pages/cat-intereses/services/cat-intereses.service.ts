import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CatInteresesModel } from '../../../../Models/catIntereses.model'


@Injectable({
  providedIn: 'root'
})
export class CatInteresesService {

  constructor(private _httpClient: HttpClient) { }
  public getCatIntereses(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CATINTERESES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let catIntereses: Array<CatInteresesModel> = new Array<CatInteresesModel>()
        data.forEach(element => {
          catIntereses.push(new CatInteresesModel(element))
        });
        return catIntereses
      })
    )
  }
  public postCatIntereses(catIntereses: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CATINTERESES_URL}`,catIntereses)
    .pipe(
      retry(1),
      map((data: any)=> {
        let catIntereses: CatInteresesModel;
        catIntereses = new CatInteresesModel(data);
        return catIntereses;
      })
    )
  }
  public putCatIntereses(catIntereses: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CATINTERESES_URL}`, catIntereses)
  }
  public deletecatIntereses(catIntereses: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idCatInteres: catIntereses.idCatInteres
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CATINTERESES_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_CATINTERESES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
