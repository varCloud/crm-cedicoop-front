
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoClienteRoutingModule } from './tipo-cliente-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';


import { TipoClienteComponent } from './tipo-cliente.component'

@NgModule({
  declarations: [TipoClienteComponent],
  imports: [
    CommonModule,
    TipoClienteRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgSelectModule,
    NgbModule,
    ArchwizardModule
  ]
})
export class TipoClienteModule { }
