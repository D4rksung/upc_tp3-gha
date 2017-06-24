import { PlanAlimenticioResolver } from './shared/plan-alimenticio-resolver.service';
import { PlanAlimenticio } from './../models/plan-alimenticio.model';
import { PlanesAlimenticiosComponent } from './planes-alimenticios.component';
import { ListaPlanesAlimenticiosComponent } from './lista-planes-alimenticios/lista-planes-alimenticios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [{
  path: '',
  component: PlanesAlimenticiosComponent,
  children: [{
    path: '',
    component: ListaPlanesAlimenticiosComponent
  },
  {
    path: ':id',
    component: PlanAlimenticio,
    resolve: {
      planAlimenticio: PlanAlimenticioResolver
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PlanAlimenticioResolver]
})
export class PlanesAlimenticiosRoutingModule { }

export const routedComponents = [PlanesAlimenticiosComponent, ListaPlanesAlimenticiosComponent, PlanAlimenticio];
