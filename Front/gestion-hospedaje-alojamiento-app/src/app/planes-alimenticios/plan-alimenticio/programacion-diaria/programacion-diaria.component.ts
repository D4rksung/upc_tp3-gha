import { Component, OnInit, Input } from '@angular/core';
import {NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionDia } from './../../../models/programacion-dia.model';

@Component({
  selector: 'gha-programacion-diaria',
  templateUrl: './programacion-diaria.component.html',
  styleUrls: ['./programacion-diaria.component.css']
})
export class ProgramacionDiariaComponent implements OnInit {
  @Input() programacionesDia: ProgramacionDia[];
  lastTab:number = 1;

  constructor() { }

  ngOnInit() {
  }

  public beforeChange($event: NgbTabChangeEvent,ts:NgbTabset) {
    if ($event.nextId === 'add-day') {
      $event.preventDefault();
      let num = this.programacionesDia.length+1;
      this.programacionesDia.push({numeroDia:num,comidas:[]});
      let lastTabId = `dia${this.lastTab}`;
      ts.select(lastTabId);
      this.lastTab = num;
    }
  };

}
