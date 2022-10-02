export interface Cotizacion {

  idCotizacion: number,
  Cotizacionescol: string,
  contactoInicial: string,
  datosFormalizacion: string,
  anticipo: string,
  cantidadAnticipo: string,
  montoServicio: string,
  requiereFactura: boolean,
  observaciobesBiaticos: string,
  observacionesGastos: string,
  observacionesObsequios: string,
  observaciobesOtros: string,
  nosConoce: boolean,
  referencia: string,
  visitoWeb: boolean,
  idCliente: number,
  idTipoServicio: number,
  idUsuario: number,
  idTipoSeguimiento: number,
  idInstructor: number,
  idCurso: number,
  activo: boolean,
}


export class CotizacionModel implements Cotizacion {
  idCotizacion: number;
  Cotizacionescol: string;
  contactoInicial: string;
  datosFormalizacion: string;
  anticipo: string;
  cantidadAnticipo: string;
  montoServicio: string;
  requiereFactura: boolean;
  observaciobesBiaticos: string;
  observacionesGastos: string;
  observacionesObsequios: string;
  observaciobesOtros: string;
  nosConoce: boolean;
  referencia: string;
  visitoWeb: boolean;
  idCliente: number;
  idTipoServicio: number;
  idUsuario: number;
  idTipoSeguimiento: number;
  idInstructor: number;
  idCurso: number;
  activo: boolean;

  constructor(item) {
    this.idCotizacion = item.idCotizacion ?? this.idCotizacion;
    this.Cotizacionescol = item.Cotizacionescol ?? this.Cotizacionescol;
    this.contactoInicial = item.contactoInicial ?? this.contactoInicial;
    this.datosFormalizacion = item.datosFormalizacion ?? this.datosFormalizacion;
    this.anticipo = item.anticipo ?? this.anticipo;
    this.cantidadAnticipo = item.cantidadAnticipo ?? this.cantidadAnticipo;
    this.montoServicio = item.montoServicio ?? this.montoServicio;
    this.requiereFactura = item.requiereFactura ?? this.requiereFactura;
    this.observaciobesBiaticos = item.observaciobesBiaticos ?? this.observaciobesBiaticos;
    this.observacionesGastos = item.observacionesGastos ?? this.observacionesGastos;
    this.observacionesObsequios = item.observacionesObsequios ?? this.observacionesObsequios;
    this.observaciobesOtros = item.observaciobesOtros ?? this.observaciobesOtros;
    this.nosConoce = item.nosConoce ?? this.nosConoce;
    this.referencia = item.referencia ?? this.referencia;
    this.visitoWeb = item.visitoWeb ?? this.visitoWeb;
    this.idCliente = item.idCliente ?? this.idCliente;
    this.idTipoServicio = item.idTipoServicio ?? this.idTipoServicio;
    this.idUsuario = item.idUsuario ?? this.idUsuario;
    this.idTipoSeguimiento = item.idTipoSeguimiento ?? this.idTipoSeguimiento;
    this.idInstructor = item.idInstructor ?? this.idInstructor;
    this.idCurso = item.idCurso ?? this.idCurso;
    this.activo = item.activo ?? this.activo;

  }


}
