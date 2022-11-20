export interface TipoSeguimiento{
    idTipoSeguimiento: Number;
    descripcion: string;
    activo: Number;
}

export class TipoSeguimientoModel implements TipoSeguimiento{
    idTipoSeguimiento: Number;
    descripcion: string;
    activo: Number;
    constructor(item:any){
        this.idTipoSeguimiento = item.idTipoSeguimiento ?? this.idTipoSeguimiento;
        this.descripcion = item.descripcion ?? this.descripcion;
        this.activo = item.activo ?? this.activo;
    }
}