import { FiltrosService } from './filtros.service';
import { PanelSeleccionAlimentosComponent } from './alimentos/panel-seleccion-alimentos/panel-seleccion-alimentos.component';
import { AlimentosService } from './alimentos/alimentos.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GenericTableModule } from '@angular-generic-table/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelSeleccionAlimentosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    GenericTableModule
  ],
  providers: [AlimentosService,FiltrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
