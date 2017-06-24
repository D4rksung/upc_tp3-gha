import { PlanAlimenticioService } from './../shared/plan-alimenticio.service';
import { PlanAlimenticio } from './../../models/plan-alimenticio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gha-lista-planes-alimenticios',
  templateUrl: './lista-planes-alimenticios.component.html',
  styleUrls: ['./lista-planes-alimenticios.component.css']
})
export class ListaPlanesAlimenticiosComponent implements OnInit {
  planesAlimenticios:PlanAlimenticio[]=[];
  filteredPlanesAlimenticios:PlanAlimenticio[]=[];

  constructor(private planAlimenticioService:PlanAlimenticioService) { }

  ngOnInit() {
     this.planAlimenticioService.getPlanesAlimenticios()
     .subscribe(planesAlimenticios=> {
      this.planesAlimenticios = planesAlimenticios;
      this.filtrarPlanesAlimenticios();
    });
  }

  filtrarPlanesAlimenticios(){
    this.filteredPlanesAlimenticios = this.planesAlimenticios.filter(p=>{
      return true;
    });
  }

}
