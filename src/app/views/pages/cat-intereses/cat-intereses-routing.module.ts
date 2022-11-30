import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatInteresesComponent } from './cat-intereses.component'

const routes: Routes = [{
  path: '', component: CatInteresesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatInteresesRoutingModule { }
