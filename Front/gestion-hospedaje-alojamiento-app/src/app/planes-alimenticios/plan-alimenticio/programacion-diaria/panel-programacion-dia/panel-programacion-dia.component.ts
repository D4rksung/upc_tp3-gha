import { Component, OnInit, Input } from '@angular/core';
import { ProgramacionDia } from './../../../../models/programacion-dia.model';
import { Comida, TipoComida } from './../../../../models/comida.model';

@Component({
  selector: 'gha-panel-programacion-dia',
  templateUrl: './panel-programacion-dia.component.html',
  styleUrls: ['./panel-programacion-dia.component.css']
})
export class PanelProgramacionDiaComponent implements OnInit {

  @Input() programacionDia:ProgramacionDia;

  comidas = [{
    tipoComida: TipoComida.Desayuno,
    nombre: "desayuno",
    abreviatura: "d",
    active: false
  }, {
    tipoComida: TipoComida.Almuerzo,
    nombre: "almuerzo",
    abreviatura: "a",
    active: false
  }, {
    tipoComida: TipoComida.Cena,
    nombre: "cena",
    abreviatura: "c",
    active: false
  }];

  constructor() { }

  ngOnInit() {
    let comidas = this.programacionDia.comidas;
    let tipos = Array.from(new Set(comidas.map(c=>c.tipo)));
    this.comidas.map(c=>tipos.includes(c.tipoComida));
  }

}
