import { PlanAlimenticioComponent } from './planes-alimenticios/plan-alimenticio/plan-alimenticio.component';
import { CriteriosSeleccionComponent } from './planes-alimenticios/plan-alimenticio/criterios-seleccion/criterios-seleccion.component';
import { PanelSeleccionAlimentosComponent } from './planes-alimenticios/plan-alimenticio/programacion-diaria/panel-seleccion-alimentos/panel-seleccion-alimentos.component';
import { ProgramacionDiariaComponent } from './planes-alimenticios/plan-alimenticio/programacion-diaria/programacion-diaria.component';
import { FiltrosService } from './filtros.service';
import { AlimentosService } from './alimentos/alimentos.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GenericTableModule } from '@angular-generic-table/core';
import { ColumnSettingsModule } from '@angular-generic-table/column-settings/column-settings.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgramacionDiariaComponent,
    PanelSeleccionAlimentosComponent,
    CriteriosSeleccionComponent,
    PlanAlimenticioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    GenericTableModule,
    ColumnSettingsModule
  ],
  providers: [AlimentosService,FiltrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
