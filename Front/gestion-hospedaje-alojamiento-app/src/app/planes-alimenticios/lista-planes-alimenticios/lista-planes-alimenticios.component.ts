import { CondicionMedica } from './../../models/condicion-medica.model';
import { Especie } from './../../models/especie.model';
import { FiltrosService } from './../../filtros.service';
import { PlanAlimenticioService } from './../shared/plan-alimenticio.service';
import { PlanAlimenticio } from './../../models/plan-alimenticio.model';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'gha-lista-planes-alimenticios',
  templateUrl: './lista-planes-alimenticios.component.html',
  styleUrls: ['./lista-planes-alimenticios.component.css']
})
export class ListaPlanesAlimenticiosComponent implements OnInit {
  title:string = 'Gestionar Planes Alimenticios';
  filtros={
    nombre: '',
    especie: -1,
    condicionMedica: -1
  };
  especies: Especie[];
  condicionesMedicas: CondicionMedica[];

  planesAlimenticios:PlanAlimenticio[]=[];
  filteredPlanesAlimenticios:PlanAlimenticio[]=[];

  constructor(private filtrosService:FiltrosService ,private planAlimenticioService:PlanAlimenticioService) { }

  ngOnInit() {
    this.planAlimenticioService.getPlanesAlimenticios()
    .subscribe(planesAlimenticios=> {
      this.planesAlimenticios = planesAlimenticios;
    });
    this.especies = this.filtrosService.getEspecies();
    this.condicionesMedicas = [];
  }

  onchangeEspecie(especie: number){
    this.filtros.condicionMedica = -1;
    this.condicionesMedicas = especie>=0?this.filtrosService.getCondicionesMedicas(especie):[];
  }

  buscarPlanesAlimenticios(){
    let params = new URLSearchParams();
    let {nombre, especie, condicionMedica} = this.filtros;
    if(nombre && nombre.length){
      params.set('nombre',nombre);
    }
    if(especie>0){
      params.set('especie',`${especie}`);
    }
    if(condicionMedica>0){
      params.set('condicionMedica',`${condicionMedica}`);
    }
    this.planAlimenticioService.getPlanesAlimenticiosWithFilter(params)
     .subscribe(planesAlimenticios=> {
      this.planesAlimenticios = planesAlimenticios;
    });
  }

  eliminar(planAlimenticio:PlanAlimenticio){
    if(!confirm(`¿Está seguro que desea eliminar el plan alimenticio ${planAlimenticio.nombre}?`)){
      this.planAlimenticioService.deletePlanAlimenticio(planAlimenticio)
      .subscribe(a=>this.buscarPlanesAlimenticios());
    }
  }

}
