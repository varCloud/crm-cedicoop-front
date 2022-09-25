import { FormArray, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { CursoModel } from './../../../Models/curso.model';
import { CursosService } from './services/cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { WizardComponent} from 'angular-archwizard';


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
  cont= 0;

  @ViewChild('wizardForm') wizardForm: WizardComponent;
  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('agregarModal') agregarModal: any;
  @ViewChild('actualizarModal') actualizarModal: any;
  currentModal: NgbModalRef;

  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  cursos = [];
  horario_final = [];
  dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
   constructor(
    private _cursosService:CursosService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
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
      costo: ["", Validators.required],
      capacidad: ["", Validators.required],
      lugar: ["", Validators.required],
      horarios: this.formBuilder.array([]),
      dias: ["",],
      fechaAlta: ["",],
      idCurso: [""],
      activo: [""]
    });
  }

  public nuevoHorario(): FormGroup{
    return this.formBuilder.group({
      dia: ["",],
      inicio: ["", Validators.required],
      final: ["", Validators.required]
    })
  }
  get horarios(): FormArray{
    return this.nuevoCurso.get('horarios') as FormArray
  }

  public addHorario(i:number) {
    if(this.cont == i) {
      this.horarios.push(this.nuevoHorario())
      console.log(i)
      this.cont++;
    }
  }

  public getCursos(){
      this._cursosService.getCursos().subscribe((cursos : Array<CursoModel>)=>{
          this.cursos = cursos; //cursos.filter((item) => item.activo !==0)
      })
  }

  private _cerrar():void {

  }

  public Agregar_Modal(): void {
    this.nuevoCurso.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar_page1():void {
    let date = new Date();
    let fechaAlta = new Date(date);
    
    this.nuevoCurso.patchValue({
      fechaAlta: fechaAlta.toISOString(),
      activo: 1
    })
    /*this._cursosService.postCurso(this.nuevoCurso.value).subscribe(()=> {
      this.getCursos();
    })*/
    console.log(this.nuevoCurso.value);
   //this.wizardForm.goToNextStep();
    if(this.nuevoCurso.valid){
    }
  }

  public agregar_page2():void {
    console.log(this.nuevoCurso);
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
          '',  
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
