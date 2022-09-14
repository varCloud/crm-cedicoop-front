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
 
  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('lgModal') lgModal: any;
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
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ["", Validators.required],
      razonSocial: ["", Validators.required],
      contacto: ["", Validators.required],
      esPersonaMoral:["", Validators.required],
      telefono: ["", Validators.required],
      mail: ["", Validators.required],
      idTipoCliente: ["", Validators.required]
      /* Logica
      activo:["", Validators.required],
      fechaAlta: ["", Validators.required],
      fechaActualizacion: ["", Validators.required],
      */
    });
  }

  public getClientes() {
    this._clientesService.getClientes().subscribe((clientes: Array<ClienteModel>) => {
      this.clientes = clientes;
    })
  }

  public getTipoClientes(){
    this._clientesService.getTipoClientes().subscribe((tipoClientes: Array<TipoClienteModel>) => {
      console.log(tipoClientes);
      this.tipoClientes = tipoClientes;
    })
  }

  private _cerrar(): void {
    this.currentModal.close();
  }

  public onSubmit(): void {
    console.log(this.nuevoCliente.value)
    
  }

  public onAgregar(): void {
    this.currentModal = this.modalService.open(this.lgModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
}
