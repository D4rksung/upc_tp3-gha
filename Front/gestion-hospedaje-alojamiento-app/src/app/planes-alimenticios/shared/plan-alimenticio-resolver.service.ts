import { PlanAlimenticioService } from './plan-alimenticio.service';
import { PlanAlimenticio } from './../../models/plan-alimenticio.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PlanAlimenticioResolver implements Resolve <PlanAlimenticio> {

  constructor(private planAlimenticioService: PlanAlimenticioService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.params['id'];
    return this.planAlimenticioService.getPlanAlimenticio(id)
    .map(planAlimenticio =>{
      if(planAlimenticio){
        return planAlimenticio;
      }
      return new PlanAlimenticio
    })
  }

}
