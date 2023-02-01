import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { InstructoresModel } from '../../../../Models/instructores.model'
@Injectable({
  providedIn: 'root'
})
export class InstructoresService {

  constructor(
    private _httpClient: HttpClient
  ) { }
  public getInstructores(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INSTRUCTORES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let Instructores: Array<InstructoresModel> = new Array<InstructoresModel>()
        data.forEach(element => {
          Instructores.push(new InstructoresModel(element))
        });
        return Instructores
      })
    )
  }
  public postInstructores(Instructores: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INSTRUCTORES_URL}`,Instructores)
    .pipe(
      retry(1),
      map((data: any)=> {
        let Instructores: InstructoresModel;
        Instructores = new InstructoresModel(data);
        return Instructores;
      })
    )
  }
  public putInstructores(Instructores: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INSTRUCTORES_URL}`, Instructores)
  }
  public deleteInstructores(Instructores: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idInstructor: Instructores.idInstructor
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_INSTRUCTORES_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_INSTRUCTORES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
