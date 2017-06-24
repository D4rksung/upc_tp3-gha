import { Alimento, Categoria, SubCategoria} from './../../../../../models/alimento.model';
import { AlimentosService } from './../../../../../alimentos/alimentos.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';

@Component({
  selector: 'gha-panel-seleccion-alimentos',
  templateUrl: './panel-seleccion-alimentos.component.html',
  styleUrls: ['./panel-seleccion-alimentos.component.css']
})
export class PanelSeleccionAlimentosComponent implements OnInit, OnChanges {
  @Input() alimentos: Alimento[];
  allAlimentos:Alimento[]=[];
  filteredAlimentos: Alimento[]=[];
  seleccionAlimentos: Alimento[]=[];
  filtros={categoria:-1,subcategoria:-1};

  categorias: Categoria[] = [{
    id: 1, nombre: 'Carnes'
  }];
  subcategorias: Categoria[] = [{
    id: 1, nombre: 'Carne de Res'
  },{
    id: 2, nombre: 'Carne de Cerdo'
  }];

  constructor(private alimentoService: AlimentosService) {  }

  ngOnInit() {
    this.getAlimentos();
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('onChanges: ',changes);
  }

  getAlimentos(){
    this.alimentoService.getAlimentos()
    .subscribe(alimentos=>{
      this.allAlimentos = alimentos;
      this.filtrarAlimentos();
    });
  }

  filtrarAlimentos(){
    this.filteredAlimentos = this.allAlimentos.filter(a=>{
      let {categoria, subcategoria} = this.filtros;
      let valid = !this.alimentos.map(a=>a.id).includes(a.id);
      if(categoria < 0 || subcategoria < 0){
        return valid && true;
      }
      return valid && a.subCategoria == subcategoria;
    });
  }

  changeSeleccionAlimento(seleccionado:boolean, alimento:Alimento){
    if(seleccionado){
      this.seleccionAlimentos.push(alimento);
    }else{
      this.seleccionAlimentos.splice(this.seleccionAlimentos.indexOf(alimento));
    }
  }

  alimentoSelected(alimento:Alimento){
    return this.seleccionAlimentos.includes(alimento);
  }

  agregarAlimentos(alimento:Alimento){
    this.seleccionAlimentos.forEach(a=>{
      this.alimentos.push(a);
    });
    this.seleccionAlimentos = [];
    this.filtrarAlimentos();
  }

  quitarAlimento(idxAlimento:number){
    this.alimentos.splice(idxAlimento,1);
    this.filtrarAlimentos();
  }
}
