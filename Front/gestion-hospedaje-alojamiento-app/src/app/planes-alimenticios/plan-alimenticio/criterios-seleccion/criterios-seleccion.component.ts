import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gha-criterios-seleccion',
  templateUrl: './criterios-seleccion.component.html',
  styleUrls: ['./criterios-seleccion.component.css']
})
export class CriteriosSeleccionComponent implements OnInit {

  razas = [{
    id: 1,
    nombre: "pequinez"
  }, {
    id: 2,
    nombre: "shitzu"
  }];

  niveles_bmi = [{
    id: 1,
    nombre: "bajo peso"
  },
  {
    id: 2,
    nombre: "peso normal"
  },
  {
    id: 3,
    nombre: "sobre peso"
  }];

  etapas_vida= [
    {
      id: 1,
      nombre: "cachorro"
    },
    {
      id: 2,
      nombre: "adulto"
    },
    {
      id: 3,
      nombre: "senior"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
