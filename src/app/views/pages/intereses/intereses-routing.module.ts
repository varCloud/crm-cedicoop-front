import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InteresesComponent } from './intereses.component'

const routes: Routes = [{
  path: '', component: InteresesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteresesRoutingModule { }
