import { Component, OnInit, ViewChild } from '@angular/core';
import { InteresesService } from './services/intereses.service';
import { ClientesService } from './../clientes/services/clientes.service';
import { CatInteresesService } from './../cat-intereses/services/cat-intereses.service';
import { InteresesModel } from './../../../Models/intereses.model';
import { ClienteModel } from './../../../Models/cliente.model';
import { CatInteresesModel } from './../../../Models/catIntereses.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-intereses',
  templateUrl: './intereses.component.html',
  styleUrls: ['./intereses.component.scss']
})
export class InteresesComponent implements OnInit {
  intereses = [];
  clientes = [];
  catIntereses = [];
  nuevoIntereses: FormGroup;
  actualizarIntereses: FormGroup;
  eliminarIntereses: FormGroup;
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
    private _interesesService: InteresesService,
    private _clientesService: ClientesService,
    private _catInteresesService: CatInteresesService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "id", prop: "idIntereseCliente"},
      {name: "Clientes", prop: "Clientes.nombre"},
      {name: "CatIntereses", prop: "CatIntereses.descripcion"},
      {name: "fechaAlta", prop: "fechaAlta"},
    ]
    this._getIntereses();
    this._getClientes();
    this._getCatIntereses();
    this.actualizarIntereses = this.initForm();
    this.eliminarIntereses = this.initForm();
    this.nuevoIntereses = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idIntereseCliente: [""],
      idInteres: ["", Validators.required],
      idCliente: ["", Validators.required],
      fechaAlta: [""],
      Clientes: [""],
      CatIntereses: [""],
      activo: [""]
    })
  }

  public _getIntereses(){
    this._interesesService.getIntereses().subscribe((intereses: Array<InteresesModel>) => {
      this.intereses = intereses.filter((item) => item.activo !== 0);
      this.temp = this.intereses;
    })
  }
  public _getClientes(){
    this._clientesService.getClientes().subscribe((clientes: Array<ClienteModel>) => {
      this.clientes = clientes.filter((item) => item.activo !== 0);
    })
  }
  public _getCatIntereses(){
    this._catInteresesService.getCatIntereses().subscribe((CatIntereses: Array<CatInteresesModel>) => {
      this.catIntereses = CatIntereses.filter((item) => item.activo !== 0);
    })
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevoIntereses.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    let date = new Date();
    let fechaActual = new Date(date);
    this.nuevoIntereses.patchValue({
      fechaAlta: fechaActual.toISOString(),
      activo: 1
    })
    this._interesesService.postIntereses(this.nuevoIntereses.value).pipe(
      take(1)
    ).subscribe(() => {
      this._getIntereses();
    })
    this._cerrar();
  }
  public Actualizar_Modal(intereses): void {
    this.actualizarIntereses.patchValue(intereses);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._interesesService.putIntereses(this.actualizarIntereses.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this._getIntereses();
    })
    this._cerrar();
  }
  public eliminar_modal(intereses): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarIntereses.patchValue(intereses)
        this._interesesService.deleteIntereses(this.eliminarIntereses.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this._getIntereses();
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
    this._interesesService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this._ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "intereses_" + fecha.toLocaleDateString() + ".csv";
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
    this.intereses = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }

}
