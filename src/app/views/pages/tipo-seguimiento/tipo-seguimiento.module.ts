import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoSeguimientoRoutingModule } from './tipo-seguimiento-routing.module';
import { TipoSeguimientoComponent } from './tipo-seguimiento.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TipoSeguimientoComponent],
  imports: [
    CommonModule,
    TipoSeguimientoRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    ReactiveFormsModule
  ]
})
export class TipoSeguimientoModule { }
