export interface Roles{
    idRol: Number,
    descripcion: String,
    activo: Number
}

export class RolesModel implements Roles{
    idRol: Number;
    descripcion: String;
    activo: Number;

    constructor(item: any){
        this.idRol = item.idRol ?? this.idRol;
        this.descripcion = item.descripcion ?? this.descripcion;
        this.activo = item.activo ?? this.activo;
    }
}