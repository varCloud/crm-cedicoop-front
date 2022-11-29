import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatInteresesRoutingModule } from './cat-intereses-routing.module';
import { CatInteresesComponent } from './cat-intereses.component';


@NgModule({
  declarations: [CatInteresesComponent],
  imports: [
    CommonModule,
    CatInteresesRoutingModule
  ]
})
export class CatInteresesModule { }
