import { CondicionMedica } from './../../models/condicion-medica.model';
import { Especie } from './../../models/especie.model';
import { FiltrosService } from './../../filtros.service';
import { PlanAlimenticioService } from './../shared/plan-alimenticio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanAlimenticio } from './../../models/plan-alimenticio.model';
import { AlimentosService } from './../../alimentos/alimentos.service';
import { Alimento } from './../../models/alimento.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gha-plan-alimenticio',
  templateUrl: './plan-alimenticio.component.html',
  styleUrls: ['./plan-alimenticio.component.css']
})
export class PlanAlimenticioComponent implements OnInit {

  title = 'Definir Plan Alimenticio';
  especies:Especie[];
  condicionesMedicas:CondicionMedica[] = [];

  @Input() planAlimenticio: PlanAlimenticio;

  constructor(private filtrosService: FiltrosService,
    private planAlimenticioService: PlanAlimenticioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { planAlimenticio: PlanAlimenticio }) => {
      this.setPlanAlimenticio(data.planAlimenticio);
    });
    this.especies = this.filtrosService.getEspecies();
  }

  onchangeEspecie(especie: number){
    this.condicionesMedicas = this.filtrosService.getCondicionesMedicas(especie);
  }

  setPlanAlimenticio(planAlimenticio:PlanAlimenticio){
    this.planAlimenticio = planAlimenticio;
  }

  guardar(){
    if(this.planAlimenticio == null){
      this.planAlimenticioService.addPlanAlimenticio(this.planAlimenticio);
    }else{
      this.planAlimenticioService.updatePlanAlimenticio(this.planAlimenticio);
    }
    this.gotoListaPlanesAlimenticios();
  }

  cancelar(){
    this.gotoListaPlanesAlimenticios();
  }

  gotoListaPlanesAlimenticios(){
    this.router.navigate(['/planesAlimenticios']);
  }

}
