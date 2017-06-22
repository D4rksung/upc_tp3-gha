import { Component, OnInit, Input } from '@angular/core';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionDia } from './../../../models/programacion-dia.model';

@Component({
  selector: 'gha-programacion-diaria',
  templateUrl: './programacion-diaria.component.html',
  styleUrls: ['./programacion-diaria.component.css']
})
export class ProgramacionDiariaComponent implements OnInit {
  @Input() programacionesDia: ProgramacionDia[];


  constructor() { }

  ngOnInit() {
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'add-day') {
      $event.preventDefault();
      let count = this.programacionesDia.length;
      this.programacionesDia.push({numeroDia:count+1,comidas:[]});
    }
  };

}
