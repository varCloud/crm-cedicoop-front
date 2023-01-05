import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructoresRoutingModule } from './instructores-routing.module';
import { InstructoresComponent } from './instructores.component';


@NgModule({
  declarations: [InstructoresComponent],
  imports: [
    CommonModule,
    InstructoresRoutingModule
  ]
})
export class InstructoresModule { }
