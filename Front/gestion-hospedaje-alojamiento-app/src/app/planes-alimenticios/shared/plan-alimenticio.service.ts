import { PlanAlimenticio } from './../../models/plan-alimenticio.model';
import { CONFIG } from './../../core/config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const planesAlimenticiosUrl = CONFIG.baseUrls.planesAlimenticios;

@Injectable()
export class PlanAlimenticioService {
  constructor(private http: Http) { }

  getPlanesAlimenticios(){
    return <Observable<PlanAlimenticio[]>>this.http
    .get(planesAlimenticiosUrl)
    .map(res => this.extractData<PlanAlimenticio[]>(res));
  }

  getPlanAlimenticio(id: number){
    return <Observable<PlanAlimenticio>>this.http
    .get(`${planesAlimenticiosUrl}/${id}`)
    .map(res => this.extractData<PlanAlimenticio>(res));
  }

  addPlanAlimenticio(planAlimenticio:PlanAlimenticio){
    return <Observable<PlanAlimenticio>>this.http
      .post(`${planesAlimenticiosUrl}`, JSON.stringify(planAlimenticio))
      .map(res => this.extractData<PlanAlimenticio>(res));
  }

  updatePlanAlimenticio(planAlimenticio:PlanAlimenticio){
    return <Observable<PlanAlimenticio>>this.http
      .put(`${planesAlimenticiosUrl}/${planAlimenticio.id}`, JSON.stringify(planAlimenticio))
      .map(res => <PlanAlimenticio>res.json().data);
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json ? res.json() : null;
    return <T>(body && body.data || {});
  }
}
