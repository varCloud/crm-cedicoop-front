import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructoresRoutingModule } from './instructores-routing.module';
import { InstructoresComponent } from './instructores.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [InstructoresComponent],
  imports: [
    CommonModule,
    InstructoresRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask
  ]
})
export class InstructoresModule { }
