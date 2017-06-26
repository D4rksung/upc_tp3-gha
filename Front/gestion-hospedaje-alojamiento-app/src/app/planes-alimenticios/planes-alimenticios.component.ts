import { FiltrosService } from './../filtros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planes-alimenticios',
  templateUrl: './planes-alimenticios.component.html',
  styleUrls: ['./planes-alimenticios.component.css']
})
export class PlanesAlimenticiosComponent implements OnInit {

  constructor(private filtrosService:FiltrosService) { }

  ngOnInit() {
    this.filtrosService.loadFiltros();
  }

}
