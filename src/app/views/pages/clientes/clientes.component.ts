import { subscribeOn } from 'rxjs/operators';
import { element } from 'protractor';
import { DataTable } from 'simple-datatables';
import { Subscription } from 'rxjs';
import { ModalComponent } from './../ui-components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteModel } from './../../../Models/cliente.model';
import { TipoClienteModel } from './../../../Models/tipoCliente.model';
import { ClientesService } from './services/clientes.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  nuevoCliente: FormGroup;
  actualizarCliente: FormGroup;
  eliminarCliente: FormGroup;
  idActualizar: Number;
  subscription: Subscription;

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
  constructor(
    private _clientesService: ClientesService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
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
      this.clientes = clientes.filter((item) => item.activo !== 0);   //eliminar los que tienes activo = 0
    })
  }

  public getTipoClientes() {
    this._clientesService.getTipoClientes().subscribe((tipoClientes: Array<TipoClienteModel>) => {
      this.tipoClientes = tipoClientes;
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
    this._clientesService.postClientes(this.nuevoCliente.value).subscribe((cliente) => {
      this.clientes.push(cliente);
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
    this._clientesService.putCliente(this.actualizarCliente.value).subscribe()

    this.clientes.map((element, index) => {
      if (element.idCliente == this.actualizarCliente.get('idCliente').value) {
        this.clientes.splice(index, 1);
        this.clientes.push(new ClienteModel(this.actualizarCliente.value));
      }
    })
    this.clientes.sort((((a, b) => Number(a.idCliente) - Number(b.idCliente))));
    this._cerrar();
  }

  public EliminarCliente_Modal(cliente): void {
    this.eliminarCliente.patchValue(cliente);
    this.currentModal = this.modalService.open(this.eliminarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }

  public EliminarCliente(): void {
    let date = new Date();
    let fechaActual = new Date(date);
    this.eliminarCliente.patchValue({
      fechaActualizacion: fechaActual.toISOString()
    });
    this._clientesService.deleteCliente(this.eliminarCliente.value).subscribe();
    this.clientes.forEach((element, index) => {
      if (element.idCliente == this.eliminarCliente.get('idCliente').value) {
        this.clientes.splice(index, 1);
      }
    });
    this._cerrar();
  }
}
