import { ActionsCotizacionComponent } from './components/actions-cotizacion/actions-cotizacion.component';
import { CotizacionesComponent } from './cotizaciones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', component: CotizacionesComponent

}, {
  path: 'nuevaCotizacion', component: ActionsCotizacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
