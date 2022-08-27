import { UsuarioService } from './services/usuario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  validationForm1: FormGroup;
  isForm1Submitted: Boolean;


  /************PROPIEDADES PARA EL MODAL**********/
  @ViewChild('lgModal') lgModal : any;
  currentModal : NgbModalRef ;
  title='Agregar'

  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  rows = [];
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this._usuarioService.obtenerUsuarios().pipe(take(1)).subscribe((data:any)=>{
       this.rows =  data;
    })
    this._createForm();
  }

  get form1() {
    return this.validationForm1.controls;
  }

  private _createForm(){
    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required]
    });
  }

  form1Submit() {
    if(this.validationForm1.valid) {

    }
    this.isForm1Submitted = true;
  }
  public onAgregar():void{
     this.currentModal =  this.modalService.open(this.lgModal, {
        backdrop :'static',
        keyboard :false,
        animation: true,
        centered:true
      })
  }


  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
