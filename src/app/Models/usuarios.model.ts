import { RolesModel } from './roles.model'

export interface Usuarios {
    idUsuario: Number,
    nombre: String,
    apellidos: String,
    telefono: String,
    mail: String,
    usuario: String,
    contrasena: String,
    activo: Number,
    idRol: Number,
    Roles : RolesModel,
}

export class UsuariosModel implements Usuarios{
    idUsuario: Number;
    nombre: String;
    apellidos: String;
    telefono: String;
    mail: String;
    usuario: String;
    contrasena: String;
    activo: Number;
    idRol: Number;
    Roles : RolesModel;

    constructor(item:any){
        this.idUsuario = item.idUsuario ?? this.idUsuario;
        this.nombre = item.nombre ?? this.nombre;
        this.apellidos = item.apellidos ?? this.apellidos;
        this.telefono = item.telefono ?? this.telefono;
        this.mail = item.mail ?? this.mail;
        this.usuario = item.usuario ?? this.usuario;
        this.contrasena = item.contrasena ?? this.contrasena;
        this.activo = item.activo ?? this.activo;
        this.idRol = item.idRol ?? this.idRol;
        this.Roles = item.Roles ?? this.Roles;
    }
}