import { ClienteModel } from './cliente.model'
import { CatInteresesModel } from './catIntereses.model'

export interface Intereses {
    idIntereseCliente : Number,
    fechaAlta : String,
    activo : Number,
    idInteres : Number,
    idCliente : Number,
    Clientes : ClienteModel,
    CatIntereses : CatInteresesModel
}

export class InteresesModel implements Intereses{
    idIntereseCliente : Number;
    fechaAlta : String;
    activo : Number;
    idInteres : Number;
    idCliente : Number;
    Clientes : ClienteModel;
    CatIntereses : CatInteresesModel;

    constructor(item: any){
        this.idIntereseCliente = item.idIntereseCliente ?? this.idIntereseCliente;
        this.fechaAlta = item.fechaAlta  ?? this.fechaAlta;
        this.activo = item.activo ?? this.activo;
        this.idInteres = item.idInteres ?? this.idInteres;
        this.idCliente = item.idCliente ?? this.idCliente;
        this.Clientes = item.Clientes?? this.Clientes;
        this.CatIntereses = item.CatIntereses?? this.CatIntereses;
    }
}

