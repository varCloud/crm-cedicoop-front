import { isThisTypeNode } from "typescript";

export interface Curso {

  activo: Number;
  capacidad: Number;
  costo: Number;
  descripcion: string;
  fechaAlta: string;
  horario: string;
  idCurso: Number;
  lugar: string;
  nombreCurso: string;

}

export class CursoModel implements Curso {

  activo: Number;
  capacidad: Number;
  costo: Number;
  descripcion: string;
  fechaAlta: string;
  horario: string;
  idCurso: Number;
  lugar: string;
  nombreCurso: string;

  constructor(item: any) {
    this.activo = item.activo ?? this.activo;
    this.capacidad = item.capacidad ?? this.capacidad;
    this.costo = item.costo ?? this.costo;
    this.descripcion = item.descripcion ?? this.descripcion;
    this.fechaAlta = item.fechaAlta ?? this.fechaAlta;
    this.horario = item.horario ?? this.horario;
    this.idCurso = item.idCurso ?? this.idCurso;
    this.lugar = item.lugar ?? this.lugar;
    this.nombreCurso = item.nombreCurso ?? this.nombreCurso;

  }

  get isValidCourse() {
    return this.capacidad <= 18
  }

}
