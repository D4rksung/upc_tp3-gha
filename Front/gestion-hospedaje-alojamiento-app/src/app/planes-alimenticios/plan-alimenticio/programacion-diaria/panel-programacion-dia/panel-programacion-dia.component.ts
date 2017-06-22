import { Component, OnInit, Input } from '@angular/core';
import { ProgramacionDia } from './../../../../models/programacion-dia.model';

@Component({
  selector: 'gha-panel-programacion-dia',
  templateUrl: './panel-programacion-dia.component.html',
  styleUrls: ['./panel-programacion-dia.component.css']
})
export class PanelProgramacionDiaComponent implements OnInit {

  @Input() programacionDia:ProgramacionDia;

  comidas = [{
    id: 1,
    nombre: "desayuno",
    abreviatura: "d",
    active: false
  }, {
    id: 2,
    nombre: "almuerzo",
    abreviatura: "a",
    active: false
  }, {
    id: 3,
    nombre: "cena",
    abreviatura: "c",
    active: false
  }];

  constructor() { }

  ngOnInit() {
    
  }

}
