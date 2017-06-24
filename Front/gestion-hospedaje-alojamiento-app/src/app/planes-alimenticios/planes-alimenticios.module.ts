import { PlanesAlimenticiosRoutingModule, routedComponents } from './planes-alimenticios-routing.module';
import { NgModule } from '@angular/core';
import { PlanesAlimenticiosComponent } from './planes-alimenticios.component';

@NgModule({
  imports: [PlanesAlimenticiosRoutingModule],
  declarations: [routedComponents]
})
export class PlanesAlimenticiosModule { }
