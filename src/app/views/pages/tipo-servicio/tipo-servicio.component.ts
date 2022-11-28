import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoServicioService } from './services/tipo-servicio.service'
import { TipoServiciosModel } from './../../../Models/tipoServicio.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.scss']
})
export class TipoServicioComponent implements OnInit {
  tipoServicio = [];
  nuevoTipoServicio: FormGroup;
  actualizarTipoServicio: FormGroup;
  eliminarTipoServicio: FormGroup;
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
    private _tipoServicioService: TipoServicioService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "Ud", prop: "idTipoServicios"},
      {name: "Descripcion", prop: "descripcion"}
    ]
    this.getTipoServicio();
    this.actualizarTipoServicio = this.initForm();
    this.eliminarTipoServicio = this.initForm();
    this.nuevoTipoServicio = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idTipoServicios: [""],
      descripcion: ["", Validators.required],
      activo: [""]
    })
  }

  public getTipoServicio(){
    this._tipoServicioService.getTipoServicio().subscribe((tipoServicio: Array<TipoServiciosModel>) => {
      this.tipoServicio = tipoServicio.filter((item) => item.activo !== 0);
      this.temp = this.tipoServicio;
    })
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevoTipoServicio.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    this.nuevoTipoServicio.patchValue({
      activo: 1
    })
    this._tipoServicioService.postTipoServicio(this.nuevoTipoServicio.value).pipe(
      take(1)
    ).subscribe(() => {
      this.getTipoServicio();
    })
    this._cerrar();
  }
  public Actualizar_Modal(tipoServicio): void {
    this.actualizarTipoServicio.patchValue(tipoServicio);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._tipoServicioService.putTipoServicio(this.actualizarTipoServicio.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.getTipoServicio();
    })
    this._cerrar();
  }
  public eliminar_modal(tipoServicio): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarTipoServicio.patchValue(tipoServicio)
        this._tipoServicioService.deleteTipoServicio(this.eliminarTipoServicio.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this.getTipoServicio();
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
    this._tipoServicioService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this.ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "tipoServicios_" + fecha.toLocaleDateString() + ".csv";
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
    this.tipoServicio = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }

}
