import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from './../../../../core/constants/constants'
import { retry, map } from 'rxjs/operators';
import { UsuariosModel } from '../../../../Models/usuarios.model'
import { RolesModel } from '../../../../Models/roles.model'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor( private _httpClient: HttpClient ) { }
  public getUsuarios(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_USUARIOS_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let Usuarios: Array<UsuariosModel> = new Array<UsuariosModel>()
        data.forEach(element => {
          Usuarios.push(new UsuariosModel(element))
        });
        return Usuarios
      })
    )
  }
  public getRoles(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_ROLES_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        let Roles: Array<RolesModel> = new Array<RolesModel>()
        data.forEach(element => {
          Roles.push(new RolesModel(element))
        });
        return Roles
      })
    )
  }
  public postUsuarios(Usuarios: any){
    return this._httpClient.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_USUARIOS_URL}`,Usuarios)
    .pipe(
      retry(1),
      map((data: any)=> {
        let Usuarios: UsuariosModel;
        Usuarios = new UsuariosModel(data);
        return Usuarios;
      })
    )
  }
  public putUsuarios(Usuarios: any) {
    return this._httpClient.put(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_USUARIOS_URL}`, Usuarios)
  }
  public deleteUsuarios(Usuarios: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idUsuario: Usuarios.idUsuario
      }
    }
    return this._httpClient.delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_USUARIOS_URL}`, options)
  }
  public getCSV(){
    return this._httpClient.get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_CSV}${CONSTANTS.API_USUARIOS_URL}`)
    .pipe(
      retry(1),
      map((data: any) => {
        return data;
      })
    )
  }
}
