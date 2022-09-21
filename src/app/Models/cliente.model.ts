
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
    TipoClientes: Object;
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
    TipoClientes: Object;

    constructor(item: any) {
        this.idCliente= item.idCliente ?? this.idCliente;
        this.nombre= item.nombre  ?? this.nombre;
        this.razonSocial= item.razonSocial  ?? this.razonSocial;
        this.contacto= item.contacto  ?? this.contacto;
        this.esPersonaMoral= item.esPersonaMoral  ?? this.esPersonaMoral;
        this.telefono= item.telefono  ?? this.telefono;
        this.mail= item.mail  ?? this.mail;
        this.activo= item.activo  ?? this.activo;
        this.fechaAlta= item.fechaAlta ?? this.fechaAlta;
        this.fechaActualizacion= item.fechaActualizacion ?? this.fechaActualizacion;
        this.idTipoCliente= item.idTipoCliente ?? this.idTipoCliente;
        this.TipoClientes = item.TipoClientes ?? this.TipoClientes;
    }
}
