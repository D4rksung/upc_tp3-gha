import { Categoria, SubCategoria } from './models/alimento.model';
import { EtapaVida } from './models/etapa-vida.model';
import { NivelBMI } from './models/nivel-bmi.model';
import { Especie } from './models/especie.model';
import { CondicionMedica } from './models/condicion-medica.model';
import { Raza } from './models/raza.model';
import { CONFIG } from './core/config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
let filtrosUrl = CONFIG.baseUrls.filtros;

interface Filtros{
  especies: Especie[];
  razas: Raza[];
  condicionesMedicas: CondicionMedica[],
  nivelesBMI: NivelBMI[],
  etapasVida: EtapaVida[],
  categorias: Categoria[],
  subCategorias: SubCategoria[]
}

@Injectable()
export class FiltrosService {
  filtros:Filtros;

  constructor(private http: Http) { }

  loadFiltros(){
    this.http.get(filtrosUrl)
    .map(res => this.filtros = this.extractData<Filtros>(res));
  }

  getEspecies(){
    return this.filtros.especies;
  }

  getRazas(especie: number){
    return this.filtros.razas.filter(r=>r.especie == especie);
  }

  getCondicionesMedicas(especie: number){
    return this.filtros.condicionesMedicas.filter(c=>c.especies.includes(especie));
  }

  getNivelesBMI(){
    return this.filtros.nivelesBMI;
  }

  getEtapasVida(){
    return this.filtros.etapasVida;
  }

  getCategorias(){
    return this.filtros.categorias;
  }

  getSubCategorias(categoria: number){
    return this.filtros.subCategorias.filter(s=>s.categoria = categoria);
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json ? res.json() : null;
    return <T>(body && body.data || {});
  }

}
