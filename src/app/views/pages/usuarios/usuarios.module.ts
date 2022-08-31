import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgxDatatableModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()

  ]
})
export class UsuariosModule { }
