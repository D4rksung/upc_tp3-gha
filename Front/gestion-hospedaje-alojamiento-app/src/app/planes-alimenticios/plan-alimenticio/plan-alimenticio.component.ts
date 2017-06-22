import { AlimentosService } from './../../alimentos/alimentos.service';
import { Alimento } from './../../models/alimento.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gha-plan-alimenticio',
  templateUrl: './plan-alimenticio.component.html',
  styleUrls: ['./plan-alimenticio.component.css']
})
export class PlanAlimenticioComponent implements OnInit {

  title = 'Definir Plan Alimenticio';
  especies = [{
    id: 1,
    nombre: "perro"
  }, {
    id: 2,
    nombre: "gato"
  }];
  condiciones_medicas = [{
    id: 1,
    nombre: "sano"
  }, {
    id: 2,
    nombre: "gripe"
  }];


  constructor() { }

  ngOnInit() {
  }

}
