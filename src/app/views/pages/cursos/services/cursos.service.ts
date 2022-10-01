import { CursoModel } from './../../../../Models/curso.model';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(private _httpClient: HttpClient) {
  }

  public getCursos() {
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`)
      .pipe(
        retry(1)
        , map((data: any) => {
          let cursos: Array<CursoModel> = new Array<CursoModel>()
          data.forEach(element => {
            cursos.push(new CursoModel(element))
          });
          return cursos;
        })

      )
  }
  public postCurso(curso: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`,curso)
    .pipe(
      retry(1),
      map((data: any)=> {
        let curso: CursoModel;
        curso = new CursoModel(data);
        return curso;
      })
    )
  }
  public putCursos(cursos: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`, cursos)
  }
  
  public deleteCurso(curso: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idCurso: curso.idCurso
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`, options)
  }
}
