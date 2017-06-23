import { Alimento, Categoria, SubCategoria} from './../../../../../models/alimento.model';
import { AlimentosService } from './../../../../../alimentos/alimentos.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {GtConfig} from '@angular-generic-table/core';

@Component({
  selector: 'gha-panel-seleccion-alimentos',
  templateUrl: './panel-seleccion-alimentos.component.html',
  styleUrls: ['./panel-seleccion-alimentos.component.css']
})
export class PanelSeleccionAlimentosComponent implements OnInit, OnChanges {
  @Input() alimentos: Alimento[];
  allAlimentos:Alimento[]=[];
  filteredAlimentos: Alimento[]=[];
  seleccionAlimentos: Alimento[];
  filtros={categoria:-1,subcategoria:-1};

  categorias: Categoria[] = [{
    id: 1, nombre: 'Carnes'
  }];
  subcategorias: Categoria[] = [{
    id: 1, nombre: 'Carne de Res'
  },{
    id: 2, nombre: 'Carne de Cerdo'
  }];

  public configObject: GtConfig<Alimento>;

  constructor(private alimentoService: AlimentosService) {
    this.configObject = {
      settings: [{
        objectKey: 'id',
        sort: 'asc',
        sortOrder: 1,
        columnOrder: 0
      }, {
        objectKey: 'nombre',
        sort: 'asc',
        sortOrder: 0,
        columnOrder: 1
      }],
      fields: [{
        name: 'Id',
        objectKey: 'id'
      }, {
        name: 'Nombre',
        objectKey: 'nombre'
      }],
      data: []
    };

  }

  ngOnInit() {
    this.getAlimentos();
    this.filtrarAlimentos();
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('onChanges: ',changes);
  }

  getAlimentos(){
    this.alimentoService.getAlimentos()
    .subscribe(alimentos=>{
      this.allAlimentos = alimentos;
    });
  }

  filtrarAlimentos(){
    this.filteredAlimentos = this.allAlimentos.filter(a=>{
      let {categoria,subcategoria} = this.filtros;
      if(categoria <0 || subcategoria <0){
        return true;
      }else{
        return a.subCategoria == subcategoria;
      }
    });
  }

  quitarAlimento(idxAlimento:number){
    this.alimentos.splice(idxAlimento,1);
  }
}
