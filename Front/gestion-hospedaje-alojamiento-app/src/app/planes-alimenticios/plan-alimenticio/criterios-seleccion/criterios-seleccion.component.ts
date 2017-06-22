import { CriterioSeleccion } from './../../../models/criterio-seleccion.model';
import { GtConfig } from '@angular-generic-table/core';
import { Component, OnInit, Input} from '@angular/core';

const defaultSeleccion = {raza: -1, nivelBMI: -1, etapaVida: -1};
interface criterioSeleccionRowData{
  especie: string,
  raza: string,
  nivelBMI: string,
  etapaVida: string
}


@Component({
  selector: 'gha-criterios-seleccion',
  templateUrl: './criterios-seleccion.component.html',
  styleUrls: ['./criterios-seleccion.component.css']
})
export class CriteriosSeleccionComponent implements OnInit {
  public configObject: GtConfig<criterioSeleccionRowData>;

  @Input() criterios: CriterioSeleccion[];

  seleccion = defaultSeleccion;

  especies = [{
    id: 1,
    nombre: 'perro'
  }, {
    id: 2,
    nombre: 'gato'
  }];

  razas = [{
    id: 1,
    nombre: 'pequinez'
  }, {
    id: 2,
    nombre: 'shitzu'
  }];

  niveles_bmi = [{
    id: 1,
    nombre: 'bajo peso'
  },
  {
    id: 2,
    nombre: 'peso normal'
  },
  {
    id: 3,
    nombre: 'sobre peso'
  }];

  etapas_vida= [
    {
      id: 1,
      nombre: 'cachorro'
    },
    {
      id: 2,
      nombre: 'adulto'
    },
    {
      id: 3,
      nombre: 'senior'
    }
  ];

  constructor() {
    this.configObject = {
      settings: [
      {
        objectKey: 'especie',
        columnOrder: 0
      },
      {
        objectKey: 'raza',
        sort: 'asc',
        sortOrder: 1,
        columnOrder: 1
      },
      {
        objectKey: 'nivelBMI',
        sort: 'asc',
        sortOrder: 0,
        columnOrder: 2
      },
      {
        objectKey: 'etapaVida',
        sort: 'asc',
        sortOrder: 2,
        columnOrder: 3
      }],
      fields: [
      {
        name: 'Especie',
        objectKey: 'especie'
      },
      {
        name: 'Raza',
        objectKey: 'raza',
        render: (row) => { return row.raza + ' 1'; }
      }, {
        name: 'Nivel BMI',
        objectKey: 'nivelBMI'
      },
      {
        name: 'Etapa Vida',
        objectKey: 'etapaVida'
      }],
      data: []
    };
  }

  ngOnInit() {
  }

  agregarCriterio() {
    let {raza, nivelBMI, etapaVida} = this.seleccion;
    let criterio:CriterioSeleccion = {
      raza: this.razas.find(r=>r.id == raza),
      nivelBMI: this.niveles_bmi.find(nb=>nb.id == nivelBMI),
      etapaVida: this.etapas_vida.find(ev=>ev.id == etapaVida)
    };
    if (this.existeCriterio(criterio)){
      this.criterios.push(criterio);
    } else {
      console.log('Ya existe criterio');
    }
  }

  existeCriterio(criterio:CriterioSeleccion){
    return !!this.criterios.find(c=>{
      return c.etapaVida== criterio.etapaVida
      && c.nivelBMI == criterio.nivelBMI
      && c.etapaVida == criterio.etapaVida;
    });
  }

  quitarCriterio(idxCriterio: number) {
    this.criterios.splice(idxCriterio, 1);
  }

}
