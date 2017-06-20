import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Definir Plan Alimenticio!';
  especie = [{id:1,nombre:"perro"},{id:1,nombre:"gato"}];
  condicion_medica = [{id:1,nombre:"sano"},{id:1,nombre:"gato"}];
  comidas = [{id:1,nombre:"desayuno"},{id:1,nombre:"almuerzo"},{id:1,nombre:"cena"}];

}
