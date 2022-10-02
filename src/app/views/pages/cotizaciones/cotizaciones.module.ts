import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsCotizacionComponent } from './components/actions-cotizacion/actions-cotizacion.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { CotizacionesComponent } from './cotizaciones.component';



@NgModule({
  declarations: [CotizacionesComponent, ActionsCotizacionComponent],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    NgbNavModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CotizacionesModule { }
