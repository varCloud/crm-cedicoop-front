import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructoresComponent } from './instructores.component'

const routes: Routes = [{
  path: '', component: InstructoresComponent 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructoresRoutingModule { }
