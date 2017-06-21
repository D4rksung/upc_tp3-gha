import { AlimentosService } from './alimentos/alimentos.service';
import { Alimento } from './models/alimento.model';
import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Definir Plan Alimenticio';
  especies = [{
    id: 1,
    nombre: "perro"
  }, {
    id: 1,
    nombre: "gato"
  }];
  condiciones_medicas = [{
    id: 1,
    nombre: "sano"
  }, {
    id: 2,
    nombre: "gripe"
  }];
  comidas = [{
    id: 1,
    nombre: "desayuno"
  }, {
    id: 2,
    nombre: "almuerzo"
  }, {
    id: 3,
    nombre: "cena"
  }];

}
