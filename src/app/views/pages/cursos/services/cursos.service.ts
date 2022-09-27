import { CursoModel } from './../../../../Models/curso.model';
import { retry, map } from 'rxjs/operators';
import { CONSTANTS } from './../../../../core/constants/constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private _refresh = new Subject<void>();
  constructor(private _httpClient: HttpClient) {
  }
  get refresh() {
    return this._refresh;
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
      }),
      tap(()=>{
        this._refresh.next()
      })
    )
  }
  public putCursos(cursos: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`, cursos)
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      )
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
    console.log(curso)
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CURSOS_URL}`, options)
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      )
  }
}
