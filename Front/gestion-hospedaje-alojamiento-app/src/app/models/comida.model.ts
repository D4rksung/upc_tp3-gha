import {Alimento} from './alimento.model';
enum TipoComida {
  Desayuno = 1, Almuerzo, Cena
}

export class Comida {
  tipo: TipoComida;
  alimentos: Alimento[];
}
