export interface Instructores{
    idInstructor: Number;
    nombre: string;
    apellidos: string;
    telefono: string;
    mail: string;
    observaciones: string;
    fechaAlta: Date;
    activo: Number;
}

export class InstructoresModel implements Instructores{
    idInstructor: Number;
    nombre: string;
    apellidos: string;
    telefono: string;
    mail: string;
    observaciones: string;
    fechaAlta: Date;
    activo: Number;

    constructor(item: any){
        this.idInstructor= item.idInstructor ?? this.idInstructor;
        this.nombre= item.nombre ?? this.nombre;
        this.apellidos= item.apellidos ?? this.apellidos;
        this.telefono= item.telefono ?? this.telefono;
        this.mail= item.mail ?? this.mail;
        this.observaciones= item.observaciones ?? this.observaciones;
        this.fechaAlta= item.fechaAlta ?? this.fechaAlta;
        this.activo= item.activo ?? this.activo;
    }
}