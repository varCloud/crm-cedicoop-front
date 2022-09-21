export interface TipoCliente {
    idTipoCliente: Number;
    descripcion: string;
    activo: Number;
}

export class TipoClienteModel implements TipoCliente{
    idTipoCliente: Number;
    descripcion: string;
    activo: Number;

    constructor(item:any) {
        
        this.idTipoCliente = item.idTipoCliente ?? this.idTipoCliente;
        this.descripcion = item.descripcion ?? this.descripcion;
        this.activo = item.activo ?? this.activo;
    }
}