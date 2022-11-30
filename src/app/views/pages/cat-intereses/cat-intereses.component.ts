import { Component, OnInit, ViewChild } from '@angular/core';
import { CatInteresesService } from './services/cat-intereses.service'
import { CatInteresesModel } from '../../../Models/catIntereses.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map, debounceTime } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-cat-intereses',
  templateUrl: './cat-intereses.component.html',
  styleUrls: ['./cat-intereses.component.scss']
})
export class CatInteresesComponent implements OnInit {
  catIntereses = [];
  nuevocatIntereses: FormGroup;
  actualizarcatIntereses: FormGroup;
  eliminarcatIntereses: FormGroup;
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
    private _catInteresesService: CatInteresesService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      {name: "Ud", prop: "idCatInteres"},
      {name: "Descripcion", prop: "descripcion"}
    ]
    this.getCatIntereses();
    this.actualizarcatIntereses = this.initForm();
    this.eliminarcatIntereses = this.initForm();
    this.nuevocatIntereses = this.initForm();
  }
  initForm(): FormGroup{
    return this.formBuilder.group({
      idCatInteres: [""],
      descripcion: ["", Validators.required],
      activo: [""]
    })
  }

  public getCatIntereses(){
    this._catInteresesService.getCatIntereses().subscribe((catIntereses: Array<CatInteresesModel>) => {
      this.catIntereses = catIntereses.filter((item) => item.activo !== 0);
      this.temp = this.catIntereses;
    })
  }
  private _cerrar(): void {
    this.currentModal.close();
  }
  public agregar_Modal(): void {
    this.nuevocatIntereses.reset();
    this.currentModal = this.modalService.open(this.agregarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    })
  }
  public agregar(): void{
    this.nuevocatIntereses.patchValue({
      activo: 1
    })
    this._catInteresesService.postCatIntereses(this.nuevocatIntereses.value).pipe(
      take(1)
    ).subscribe(() => {
      this.getCatIntereses();
    })
    this._cerrar();
  }
  public Actualizar_Modal(catIntereses): void {
    this.actualizarcatIntereses.patchValue(catIntereses);
    this.currentModal = this.modalService.open(this.actualizarModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }
  public actualizar(): void {
    this._catInteresesService.putCatIntereses(this.actualizarcatIntereses.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.getCatIntereses();
    })
    this._cerrar();
  }
  public eliminar_modal(catIntereses): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarcatIntereses.patchValue(catIntereses)
        this._catInteresesService.deletecatIntereses(this.eliminarcatIntereses.value).
        pipe(
          take(1)
        ).
        subscribe(() => {
          this.getCatIntereses();
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
    this._catInteresesService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this._ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "catInteresess_" + fecha.toLocaleDateString() + ".csv";
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
    this.catIntereses = this.temp.filter((item) => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          return true;
        }
      }
    });
  }

}
