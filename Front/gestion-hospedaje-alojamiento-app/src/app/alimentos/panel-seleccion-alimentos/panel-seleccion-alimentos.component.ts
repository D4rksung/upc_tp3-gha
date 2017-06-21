import { AlimentosService } from '../alimentos.service';
import { Alimento } from '../../models/alimento.model';
import { Component, OnInit } from '@angular/core';
import {GtConfig} from '@angular-generic-table/core';

@Component({
  selector: 'app-panel-seleccion-alimentos',
  templateUrl: './panel-seleccion-alimentos.component.html',
  styleUrls: ['./panel-seleccion-alimentos.component.css']
})
export class PanelSeleccionAlimentosComponent implements OnInit {
  public configObject: GtConfig<Alimento>;

  constructor(private alimentoService: AlimentosService) {
    this.configObject={
      settings: [{
        objectKey: 'id',
        sort: 'asc',
        sortOrder: 1,
        columnOrder: 0
      }, {
        objectKey: 'nombre',
        sort: 'asc',
        sortOrder: 0,
        columnOrder: 1
      }],
      fields: [{
        name: 'Id',
        objectKey: 'id'
      }, {
        name: 'Nombre',
        objectKey: 'nombre'
      }],
      data: []
    }

  }

  ngOnInit() {
    this.getAlimentos();
  }

  getAlimentos(){
    this.configObject.data = [];
    this.alimentoService.getAlimentos()
    .subscribe(alimentos=>{
      this.configObject.data = alimentos;
    });
  }

}
