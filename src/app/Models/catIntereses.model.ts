export interface CatIntereses {
    idCatInteres: Number;
    descripcion: string;
    activo: Number;
}

export class CatInteresesModel implements CatIntereses{
    idCatInteres: Number;
    descripcion: string;
    activo: Number;
    constructor(item:any) {
        this.idCatInteres = item.idCatInteres ?? this.idCatInteres;
        this.descripcion = item.descripcion ?? this.descripcion;
        this.activo = item.activo ?? this.activo;
    }
}