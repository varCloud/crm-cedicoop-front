import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './services/usuario.service'
import { UsuariosModel } from './../../../Models/usuarios.model';
import { RolesModel } from './../../../Models/roles.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios = [];
  roles = [];
  nuevoUsuarios: FormGroup;
  actualizarUsuarios: FormGroup;
  eliminarUsuarios: FormGroup;
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
    private _usuariosService: UsuarioService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "id", prop: "idUsuario"},
      {name: "Nombre", prop: "nombre"},
      {name: "Apellidos", prop: "apellidos"},
      {name: "Telefono", prop: "telefono"},
      {name: "Mail", prop: "mail"},
      {name: "Usuario", prop: "usuario"},
      {name: "Rol", prop: "Rol.descripcion"}
    ]
    this.getusuarios();
    this.getRoles();
    this.actualizarUsuarios = this.initForm();
    this.eliminarUsuarios = this.initForm();
    this.nuevoUsuarios = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idUsuario: [""],
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      telefono: ["", Validators.required],
      mail: ["", Validators.required],
      usuario: ["", Validators.required],
      contrasena: ["", Validators.required],
      idRol: ["", Validators.required],
      activo: [""]
    })
  }

  public getusuarios(){
    this._usuariosService.getUsuarios().subscribe((usuarios: Array<UsuariosModel>) => {
      this.usuarios = usuarios.filter((item) => item.activo !== 0);
      this.temp = this.usuarios;
    })
  }
  public getRoles(){
    this._usuariosService.getRoles().subscribe((roles: Array<RolesModel>) => {
      this.roles = roles.filter((item) => item.activo !== 0);
    })
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevoUsuarios.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    this.nuevoUsuarios.patchValue({
      activo: 1
    })
    this._usuariosService.postUsuarios(this.nuevoUsuarios.value).pipe(
      take(1)
    ).subscribe(() => {
      this.getusuarios();
    })
    this._cerrar();
  }
  public Actualizar_Modal(usuarios): void {
    this.actualizarUsuarios.patchValue(usuarios);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._usuariosService.putUsuarios(this.actualizarUsuarios.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.getusuarios();
    })
    this._cerrar();
  }
  public eliminar_modal(usuarios): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarUsuarios.patchValue(usuarios)
        this._usuariosService.deleteUsuarios(this.eliminarUsuarios.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this.getusuarios();
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
    this._usuariosService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this.ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "usuarioss_" + fecha.toLocaleDateString() + ".csv";
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
    this.usuarios = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }
}
