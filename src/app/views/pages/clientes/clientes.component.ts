import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteModel } from './../../../Models/cliente.model';
import { TipoClienteModel } from './../../../Models/tipoCliente.model';
import { ClientesService } from './services/clientes.service';
import { TipoClienteService } from './../tipo-cliente/services/tipo-cliente.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  nuevoCliente: FormGroup;
  actualizarCliente: FormGroup;
  eliminarCliente: FormGroup;
  subscription: Subscription;
  @ViewChild('search', { static: false }) search: any;

  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('lgModal') lgModal: any;
  @ViewChild('actualizarModal') actualizarModal: any;
  @ViewChild('eliminarModal') eliminarModal: any;
  currentModal: NgbModalRef;

  title = 'Agregar'
  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  clientes = [];
  tipoClientes = [];
  public columns: Array<object>;
  public temp: Array<object>= [];
  constructor(
    private _clientesService: ClientesService,
    private _tipoClienteService: TipoClienteService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.columns = [
      {name: "id", prop: "idCliente"},
      {name: "Nombre", prop: "nombre"},
      {name: "Razon Social", prop: "razonSocial"},
      {name: "Contacto", prop: "contacto"},
      {name: "Telefono", prop: "telefono"},
      {name: "Mail", prop: "mail"},
      {name: "Persona Moral", prop: "esPersonaMoral"},
      {name: "Fecha de alta", prop: "fechaAlta"},
      {name: "Fecha Actualizacion", prop: "fechaActualizacion"},
      {name: "Tipo de Cliente", prop: "TipoClientes.descripcion"}
    ]
    this.getClientes();
    this.getTipoClientes();
    this.nuevoCliente = this.initForm();
    this.actualizarCliente = this.initForm();
    this.eliminarCliente = this.initForm();
    this.subscription = this._clientesService.refresh.subscribe(() => { //refresh table
      this.clientes = [...this.clientes];
    })
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ["", Validators.required],
      razonSocial: ["", Validators.required],
      contacto: ["", Validators.required],
      esPersonaMoral: ["", Validators.required],
      telefono: ["", Validators.required],
      mail: ["", Validators.required && Validators.email],
      idTipoCliente: ["", Validators.required],
      fechaAlta: [""],
      fechaActualizacion: [""],
      activo: [""],
      idCliente: [""],
      TipoClientes: [""]
    });
  }

  public getClientes() {
    this._clientesService.getClientes().subscribe((clientes: Array<ClienteModel>) => {
      this.clientes = clientes.filter((item) => item.activo !== 0);   //eliminar los que tienen activo = 0
      this.temp = this.clientes;
    })
  }

  public getTipoClientes() {
    this._tipoClienteService.getTipoCliente().subscribe((tipoClientes: Array<TipoClienteModel>) => {
      this.tipoClientes = tipoClientes.filter((item) => item.activo !== 0);
    })
  }

  private _cerrar(): void {
    this.currentModal.close();
  }

  public AgregarCliente_Modal(): void {
    this.nuevoCliente.reset();
    this.currentModal = this.modalService.open(this.lgModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }

  public agregarCliente(): void {
    let date = new Date();
    let fechaActual = new Date(date);
    this.nuevoCliente.patchValue({
      fechaAlta: fechaActual.toISOString(),
      fechaActualizacion: fechaActual.toISOString(),
      activo: 1
    });
    this._clientesService.postClientes(this.nuevoCliente.value).subscribe(() => {
      this.getClientes();
    });
    this._cerrar();
  }

  public ActualizarCliente_Modal(cliente): void {
    this.actualizarCliente.patchValue(cliente);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }

  public ActualizarCliente(): void {
    let date = new Date();
    let fechaActual = new Date(date);
    this.actualizarCliente.patchValue({
      fechaActualizacion: fechaActual.toISOString()
    });
    this._clientesService.putCliente(this.actualizarCliente.value).subscribe( () => {
      this.getClientes();
    })
    this._cerrar();
  }

  
  public eliminar_modal(cliente): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarCliente.patchValue(cliente)
        this._clientesService.deleteCliente(this.eliminarCliente.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this.getClientes();
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
    this._clientesService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this._ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "clientes_" + fecha.toLocaleDateString() + ".csv";
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
    this.clientes = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }
}
