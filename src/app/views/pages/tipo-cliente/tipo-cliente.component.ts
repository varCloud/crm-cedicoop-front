import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoClienteService } from './services/tipo-cliente.service'
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { TipoClienteModel } from './../../../Models/tipoCliente.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';



@Component({
  selector: 'app-tipo-cliente',
  templateUrl: './tipo-cliente.component.html',
  styleUrls: ['./tipo-cliente.component.scss']
})
export class TipoClienteComponent implements OnInit {
  tipoClientes = []
  nuevoTipoCliente: FormGroup;
  actualizarTipoCliente: FormGroup;
  eliminarTipoCliente: FormGroup;

  public temp: Array<object> = [];
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
    private _tipoClienteService: TipoClienteService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.columns = [
      { name: "Id", prop: "idTipoCliente" },
      { name: "Descripcion", prop: "descripcion" }
    ]
    this.getTipoCliente()
    this.actualizarTipoCliente = this.initForm();
    this.nuevoTipoCliente = this.initForm();
    this.eliminarTipoCliente = this.initForm();
  }
  initForm(): FormGroup {
    return this.formBuilder.group({
      idTipoCliente: [""],
      descripcion: ["", Validators.required],
      activo: [""]
    });
  }

  public getTipoCliente() {
    this._tipoClienteService.getTipoCliente().subscribe((cursos: Array<TipoClienteModel>) => {
      this.tipoClientes = cursos.filter((item) => item.activo !== 0)
      this.temp = this.tipoClientes;
    })
  }
  public agregar_Modal(): void {
    this.nuevoTipoCliente.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    this.nuevoTipoCliente.patchValue({
      activo: 1
    })
    this._tipoClienteService.postTipoCliente(this.nuevoTipoCliente.value).pipe(
      take(1)
    ).subscribe(() => {
      this.getTipoCliente()
    })
    this._cerrar();
  }
  Descargar_CSV() {
    this._tipoClienteService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this.ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "tipoClientes_" + fecha.toLocaleDateString() + ".csv";
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
  public Actualizar_Modal(curso): void {
    this.actualizarTipoCliente.patchValue(curso);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public actualizar(): void {
    this._tipoClienteService.putTipoCliente(this.actualizarTipoCliente.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.getTipoCliente();
    })
    this._cerrar();
  }
  public eliminar_modal(curso): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarTipoCliente.patchValue(curso)
        this._tipoClienteService.deleteTipoCliente(this.eliminarTipoCliente.value).subscribe(() => {
          this.getTipoCliente();
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
    this.tipoClientes = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }
}
