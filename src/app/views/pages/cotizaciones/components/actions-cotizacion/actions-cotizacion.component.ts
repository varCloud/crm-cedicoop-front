import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CotizacionModel } from 'src/app/Models/cotizacion';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-actions-cotizacion',
  templateUrl: './actions-cotizacion.component.html',
  styleUrls: ['./actions-cotizacion.component.scss']
})
export class ActionsCotizacionComponent implements OnInit {

  private cotizacionActual: CotizacionModel;
  public formCotizacion: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm(): void {
    this.formCotizacion = new FormGroup({
      name: new FormControl('', [Validators.required]),
      paternalLast: new FormControl('', [Validators.required]),
      identity: new FormControl('', [Validators.required],),
      idCotizacion: new FormControl('', [Validators.required],),
      Cotizacionescol: new FormControl('', [Validators.required],),
      contactoInicial: new FormControl('', [Validators.required],),
      datosFormalizacion: new FormControl('', [Validators.required],),
      anticipo: new FormControl('', [Validators.required],),
      cantidadAnticipo: new FormControl('', [Validators.required],),
      montoServicio: new FormControl('', [Validators.required],),
      requiereFactura: new FormControl('', [Validators.required],),
      observaciobesBiaticos: new FormControl('', [Validators.required],),
      observacionesGastos: new FormControl('', [Validators.required],),
      observacionesObsequios: new FormControl('', [Validators.required],),
      observaciobesOtros: new FormControl('', [Validators.required],),
      nosConoce: new FormControl('', [Validators.required],),
      referencia: new FormControl('', [Validators.required],),
      visitoWeb: new FormControl('', [Validators.required],),
      idCliente: new FormControl('', [Validators.required],),
      idTipoServicio: new FormControl('', [Validators.required],),
      idUsuario: new FormControl('', [Validators.required],),
      idTipoSeguimiento: new FormControl('', [Validators.required],),
      idInstructor: new FormControl('', [Validators.required],),
      idCurso: new FormControl('', [Validators.required],),
      activo: new FormControl('', [Validators.required],),
    })

  }

}
