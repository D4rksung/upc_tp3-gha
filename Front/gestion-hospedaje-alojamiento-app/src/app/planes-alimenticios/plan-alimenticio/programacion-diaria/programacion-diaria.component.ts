import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gha-programacion-diaria',
  templateUrl: './programacion-diaria.component.html',
  styleUrls: ['./programacion-diaria.component.css']
})
export class ProgramacionDiariaComponent implements OnInit {

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
