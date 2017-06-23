export class Categoria{
  id: number;
  nombre: string;
}

export class SubCategoria{
  id: number;
  categoria: number;
  nombre: string;
}

export class Alimento {
  id: number;
  nombre: string;
  subCategoria: number;
  cantidad: number;
  unidad: string;
}
