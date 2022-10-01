import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { PipePipe } from './pipe.pipe';

@NgModule({
  declarations: [CursosComponent, PipePipe],
  imports: [
    CommonModule,
    CursosRoutingModule,
    NgxDatatableModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask
    NgSelectModule,
    NgbModule,
    ArchwizardModule,
  ]
})
export class CursosModule { }
