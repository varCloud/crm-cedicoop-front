import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoSeguimientoService } from './services/tipo-seguimiento.service'
import { TipoSeguimientoModel } from './../../../Models/tipoSeguimiento.model';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-tipo-seguimiento',
  templateUrl: './tipo-seguimiento.component.html',
  styleUrls: ['./tipo-seguimiento.component.scss']
})
export class TipoSeguimientoComponent implements OnInit {
  tipoSeguimiento = [];
  nuevoTipoSeguimiento: FormGroup;
  actualizarTipoSeguimiento: FormGroup;
  eliminarTipoSeguimiento: FormGroup;
  public temp: Array<object>= [];
  public columns: Array<object>;
  @ViewChild('search', { static: false }) search: any;
  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('agregarModal') agregarModal: any;
  @ViewChild('actualizarModal') actualizarModal: any;
  currentModal: NgbModalRef;
  constructor(
    private _tipoSeguimientoService: TipoSeguimientoService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "Ud", prop: "idTipoSeguimiento"},
      {name: "Descripcion", prop: "descripcion"}
    ]
    this.getTipoSeguimiento();
    this.actualizarTipoSeguimiento = this.initForm();
    this.eliminarTipoSeguimiento = this.initForm();
    this.nuevoTipoSeguimiento = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idTipoSeguimiento: [""],
      descripcion: ["", Validators.required],
      activo: [""]
    })
  }

  public getTipoSeguimiento(){
    this._tipoSeguimientoService.getTipoSeguimiento().subscribe((tipoSeguimiento: Array<TipoSeguimientoModel>) => {
      this.tipoSeguimiento = tipoSeguimiento.filter((item) => item.activo !== 0);
      this.temp = this.tipoSeguimiento;
    })
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevoTipoSeguimiento.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    this.nuevoTipoSeguimiento.patchValue({
      activo: 1
    })
    this._tipoSeguimientoService.postTipoSeguimiento(this.nuevoTipoSeguimiento.value).pipe(
      take(1)
    ).subscribe(() => {
      this.getTipoSeguimiento();
    })
    this._cerrar();
  }
  public Actualizar_Modal(tipoSeguimiento): void {
    this.actualizarTipoSeguimiento.patchValue(tipoSeguimiento);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._tipoSeguimientoService.putTipoSeguimiento(this.actualizarTipoSeguimiento.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.getTipoSeguimiento();
    })
    this._cerrar();
  }
  public eliminar_modal(tipoSeguimiento): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarTipoSeguimiento.patchValue(tipoSeguimiento)
        this._tipoSeguimientoService.deleteTipoSeguimiento(this.eliminarTipoSeguimiento.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this.getTipoSeguimiento();
          Swal.fire(
            'Eliminado!',
            '',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        )
      }
    })
  }
  Descargar_CSV() {
    this._tipoSeguimientoService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this.ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "tipoSeguimientos_" + fecha.toLocaleDateString() + ".csv";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }
  ConvertToCSV(objArray) {
    let text = Object.keys(objArray[0]).toString();
    text +='\n';
    for(let i in objArray){
      text += Object.values(objArray[i]).toString() + "\n"
    }
    return text
  }
  /**********Busqueda************/
  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x) => x['target']['value'])
      )
      .subscribe((value) => {
        this.updateFilter(value);
      });
  }
  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.tipoSeguimiento = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }
}
