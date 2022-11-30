import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule } from '@angular/forms';

import { CatInteresesRoutingModule } from './cat-intereses-routing.module';
import { CatInteresesComponent } from './cat-intereses.component';


@NgModule({
  declarations: [CatInteresesComponent],
  imports: [
    CommonModule,
    CatInteresesRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    ReactiveFormsModule
  ]
})
export class CatInteresesModule { }
