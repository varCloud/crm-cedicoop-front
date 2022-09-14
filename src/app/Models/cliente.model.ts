
export interface Cliente {
    idCliente: Number;
    nombre: string;
    razonSocial: string;
    contacto: string;
    esPersonaMoral: Number;
    telefono: string;
    mail: string;
    activo: Number;
    fechaAlta: Date;
    fechaActualizacion: Date;
    idTipoCliente: Number;
    tipoCliente: Object;
}

export class ClienteModel implements Cliente {
    idCliente: Number;
    nombre: string;
    razonSocial: string;
    contacto: string;
    esPersonaMoral: Number;
    telefono: string;
    mail: string;
    activo: Number;
    fechaAlta: Date;
    fechaActualizacion: Date;
    idTipoCliente: Number;
    tipoCliente: Object;

    constructor(item: any) {
        this.idCliente= item.idCliente;
        this.nombre= item.nombre ;
        this.razonSocial= item.razonSocial ;
        this.contacto= item.contacto ;
        this.esPersonaMoral= item.esPersonaMoral ;
        this.telefono= item.telefono ;
        this.mail= item.mail ;
        this.activo= item.activo ;
        this.fechaAlta= item.fechaAlta;
        this.fechaActualizacion= item.fechaActualizacion;
        this.idTipoCliente= item.idTipoCliente;
        this.tipoCliente = item.TipoClientes;
    }
}
