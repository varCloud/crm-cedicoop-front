import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoSeguimientoComponent } from './tipo-seguimiento.component'

const routes: Routes = [{
  path: '', component: TipoSeguimientoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoSeguimientoRoutingModule { }
