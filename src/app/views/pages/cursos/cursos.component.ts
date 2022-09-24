import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CursoModel } from './../../../Models/curso.model';
import { CursosService } from './services/cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  nuevoCurso: FormGroup;
  actualizarCurso: FormGroup;
  elminarCurso: FormGroup;
  subscription: Subscription;

  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('lgModal') lgModal: any;
  @ViewChild('actualizarModal') actualizarModal: any;
  currentModal: NgbModalRef;

  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  cursos = [];
   constructor(
    private _cursosService:CursosService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
  ) {


  }

  ngOnInit(): void {
      this.getCursos();
      this.nuevoCurso = this.initForm();
      this.subscription = this._cursosService.refresh.subscribe(()=> {
        this.cursos = [...this.cursos];
      })
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombreCurso: ["", Validators.required],
      descripcion: ["", Validators.required],
      fechaAlta: ["", Validators.required],
      costo: ["", Validators.required],
      capacidad: ["", Validators.required],
      lugar: ["", Validators.required],
      horario: ["", Validators.required],
      idCurso: [""],
      activo: [""]
    });
  }

  public getCursos(){
      this._cursosService.getCursos().subscribe((cursos : Array<CursoModel>)=>{
          this.cursos = cursos; //cursos.filter((item) => item.activo !==0)
      })
  }

  private _cerrar():void {

  }

  public onAgregar():void {

  }

  public eliminar_modal(): void {
    Swal.fire({  
      title: 'Estas seguro de eliminar?',
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Si',  
      cancelButtonText: 'No'  
    }).then((result) => {  
      if (result.value) {  
        Swal.fire(  
          'Eliminado!',  
          'Dato eliminado',  
          'success'
        )  
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelado',
          '',
          'error'
        )  
      }  
    })  
  }
}
