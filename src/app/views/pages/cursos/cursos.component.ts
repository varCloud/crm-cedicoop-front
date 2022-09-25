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
  divHoras = document.getElementById('horas')

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
      dias: ["",Validators.required],
      horarios: this.formBuilder.array([]),
      horario: ["",],
      fechaAlta: ["",],
      idCurso: [""],
      activo: [""]
    });
  }

  public nuevoHorario(): FormGroup{
    return this.formBuilder.group({
      inicio: ["", Validators.required],
      final: ["", Validators.required]
    })
  }
  get horarios(): FormArray{
    return this.nuevoCurso.get('horarios') as FormArray
  }

  public addHorario() {
    this.horarios.push(this.nuevoHorario())
  }
  public deleteHorario() {
    this.horarios.clear();
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
    let dia = this.nuevoCurso.get('dias').value;
    dia.forEach(element => {
      this.addHorario();
    });
  }

  private _stringHora(hora:any){
    let hora_string ='';
    hora_string += `${hora.hour}:${hora.minute}`;
    return hora_string;
  }

  public agregar_page2():void {
    let horario= '';
    this.nuevoCurso.get('horarios').value.forEach( (item,index) => {
      horario += `${this.nuevoCurso.get('dias').value[index]}-${this._stringHora(this.nuevoCurso.get('horarios').value[index].inicio)}-${this._stringHora(this.nuevoCurso.get('horarios').value[index].final)}|`
    });
    this.nuevoCurso.patchValue({
      horario: horario
    })
    console.log(this.nuevoCurso.value)
    /*this._cursosService.postCurso(this.nuevoCurso.value).subscribe(()=> {
      this.getCursos();
    })*/
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
