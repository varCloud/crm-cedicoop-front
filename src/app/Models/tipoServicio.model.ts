export interface TipoServicios{
    idTipoServicios: Number;
    descripcion: string;
    activo: Number;
}

export class TipoServiciosModel implements TipoServicios{
    idTipoServicios: Number;
    descripcion: string;
    activo: Number;
    constructor(item:any){
        this.idTipoServicios = item.idTipoServicios ?? this.idTipoServicios;
        this.descripcion = item.descripcion ?? this.descripcion;
        this.activo = item.activo ?? this.activo;
    }
}