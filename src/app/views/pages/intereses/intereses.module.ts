import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteresesRoutingModule } from './intereses-routing.module';
import { InteresesComponent } from './intereses.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [InteresesComponent],
  imports: [
    CommonModule,
    InteresesRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class InteresesModule { }
