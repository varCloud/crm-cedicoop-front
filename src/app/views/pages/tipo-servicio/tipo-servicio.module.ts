import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule } from '@angular/forms';

import { TipoServicioRoutingModule } from './tipo-servicio-routing.module';
import { TipoServicioComponent } from '../tipo-servicio/tipo-servicio.component';


@NgModule({
  declarations: [TipoServicioComponent],
  imports: [
    CommonModule,
    TipoServicioRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    ReactiveFormsModule
  ]
})
export class TipoServicioModule { }
