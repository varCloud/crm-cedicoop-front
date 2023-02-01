import { Component, OnInit, ViewChild } from '@angular/core';
import { InstructoresService } from './services/instructores.service';
import { InstructoresModel } from './../../../Models/instructores.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.scss']
})
export class InstructoresComponent implements OnInit {
  instructores = [];
  nuevoInstructores: FormGroup;
  actualizarInstructores: FormGroup;
  eliminarInstructores: FormGroup;
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
    private _instructoresService: InstructoresService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "id", prop: "idInstructor"},
      {name: "nombre", prop: "nombre"},
      {name: "apellidos", prop: "apellidos"},
      {name: "telefono", prop: "telefono"},
      {name: "mail", prop: "mail"},
      {name: "observaciones", prop: "observaciones"},
      {name: "fechaAlta", prop: "fechaAlta"},
    ]
    this._getinstructores();
    this.actualizarInstructores = this.initForm();
    this.eliminarInstructores = this.initForm();
    this.nuevoInstructores = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idInstructor: [""],
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      telefono: ["", Validators.required],
      mail: ["", Validators.required && Validators.email],
      observaciones: ["", Validators.required],
      fechaAlta: [""],
      activo: [""]
      })
  }

  public _getinstructores(){
    this._instructoresService.getInstructores().subscribe((instructores: Array<InstructoresModel>) => {
      this.instructores = instructores.filter((item) => item.activo !== 0);
      this.temp = this.instructores;
    })
  }

  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevoInstructores.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    let date = new Date();
    let fechaActual = new Date(date);
    this.nuevoInstructores.patchValue({
      fechaAlta: fechaActual.toISOString(),
      activo: 1
    })
    this._instructoresService.postInstructores(this.nuevoInstructores.value).pipe(
      take(1)
    ).subscribe(() => {
      this._getinstructores();
    })
    this._cerrar();
  }
  public Actualizar_Modal(instructores): void {
    this.actualizarInstructores.patchValue(instructores);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._instructoresService.putInstructores(this.actualizarInstructores.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this._getinstructores();
    })
    this._cerrar();
  }
  public eliminar_modal(instructores): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarInstructores.patchValue(instructores)
        this._instructoresService.deleteInstructores(this.eliminarInstructores.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this._getinstructores();
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
    this._instructoresService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this._ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "instructores_" + fecha.toLocaleDateString() + ".csv";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }
  _ConvertToCSV(objArray) {
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
        this._updateFilter(value);
      });
  }
  _updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.instructores = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }

}
