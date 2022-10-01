import { FormArray, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CursoModel } from './../../../Models/curso.model';
import { CursosService } from './services/cursos.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ColumnMode, columnsByPin } from '@swimlane/ngx-datatable';
import { map, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { WizardComponent} from 'angular-archwizard';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, AfterViewInit {

  public temp: Array<object> = [];
  public columns: Array<object>;


  nuevoCurso: FormGroup;
  actualizarCurso: FormGroup;
  eliminarCurso: FormGroup;
  divHoras = document.getElementById('horas')
  @ViewChild('search', {static: false}) search: any;

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
  dias_temp = []
   constructor(
    private _cursosService:CursosService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) {
    

  }

  ngOnInit(): void {
    this.columns = [
      {name:"Id", prop:"idCurso"},
      {name:"Nombre", prop:"nombreCurso"},
      {name:"Descripcion", prop:"descripcion"},
      {name:"Horario", prop:"horario"},
      {name:"Lugar", prop:"lugar"},
      {name:"Capacidad", prop:"capacidad"},
      {name:"Costo", prop:"costo"},
      {name:"Fecha Alta", prop:"fechaAlta"},
    ]
    this.getCursos();
    this.nuevoCurso = this.initForm();
    this.actualizarCurso = this.initForm();
    this.eliminarCurso = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombreCurso: ["", Validators.required],
      descripcion: ["", Validators.required],
      costo: ["", Validators.required],
      capacidad: ["", Validators.required],
      lugar: ["", Validators.required],
      horarios: this.formBuilder.array([]),
      horario: [""],
      fechaAlta: [""],
      idCurso: [""],
      activo: [""]
    });
  }

  public nuevoHorario(): FormGroup{
    return this.formBuilder.group({
      activo: ['', ],
      inicio: [{hour: 0, minute: 0}, Validators.required],
      final: [{hour: 0, minute: 0}, Validators.required]
    })
  }
  get horarios(): FormArray{
    return this.nuevoCurso.get('horarios') as FormArray
  }
  get horarios_actualizar(): FormArray{
    return this.actualizarCurso.get('horarios') as FormArray
  }

  public addHorario(agregar = true) {
    if(agregar)
      this.horarios.push(this.nuevoHorario())
    else
      this.horarios_actualizar.push(this.nuevoHorario())
  }
  public deleteHorario(agregar = true) {
    if(agregar)
      this.horarios.clear();
    else
      this.horarios_actualizar.clear();
  }

  public getCursos(){
      this._cursosService.getCursos().subscribe((cursos : Array<CursoModel>)=>{
          this.cursos = cursos.filter((item) => item.activo !==0)
          this.temp = this.cursos;
      })
  }

  private _cerrar():void {
    this.currentModal.close();
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
    for(let i=0; i<this.dias.length; i++){
      this.addHorario();
    }
  }

  private _stringHora(hora:any){
    let hora_string ='';
    hora_string += `${hora.hour}:${hora.minute}`;
    return hora_string;
  }

  public agregar_page2():void {
    let horario= '';
    this.nuevoCurso.get('horarios').value.forEach( (item,index) => {
      if(item.activo == true){
        horario += `${this.dias[index]}-${this._stringHora(item.inicio)}-${this._stringHora(item.final)}|`
      }
    });
    this.nuevoCurso.patchValue({
      horario: horario
    })
    this._cursosService.postCurso(this.nuevoCurso.value).subscribe(()=> {
      this.getCursos();
    });
    this._cerrar();
    this.deleteHorario();
  }

  public Actualizar_Modal(curso): void {
    this.actualizarCurso.patchValue(curso);
    let horario = new Array(7);
    curso.horario.split("|").map((horarios)=>{
      let split = horarios.split('-')
      if( split.length == 3){
          let hora_inicio = split[1].split(":");
          let hora_final = split[2].split(":");
          this.dias.map((element, index) =>{
            if (element == split[0])
              horario[index] = {
                activo: true,
                inicio: {
                  hour: parseInt(hora_inicio[0]),
                  minute: parseInt(hora_inicio[1])
                },
                final: {
                  hour: parseInt(hora_final[0]),
                  minute: parseInt(hora_final[1])
                }
              }
          })
      }
    })
    for(let i=0;i<this.dias.length;i++){
      this.addHorario(false)
    }
    this.actualizarCurso.patchValue({
      horarios: horario
    });
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void{
    let horario= '';
    this.actualizarCurso.get('horarios').value.forEach( (item,index) => {
      if(item.activo == true){
        horario += `${this.dias[index]}-${this._stringHora(item.inicio)}-${this._stringHora(item.final)}|`
      }
    });
    this.actualizarCurso.patchValue({
      horario: horario
    })
    this._cursosService.putCursos(this.actualizarCurso.value).subscribe( () => {
      this.getCursos();
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
        this.eliminarCurso.patchValue(curso)
        this._cursosService.deleteCurso(this.eliminarCurso.value).subscribe(()=>{
          this.getCursos();
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
    this.cursos = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }
}