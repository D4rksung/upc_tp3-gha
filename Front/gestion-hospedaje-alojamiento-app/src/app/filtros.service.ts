import { CONFIG } from './core/config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
let filtrosUrl = CONFIG.baseUrls.config;

@Injectable()
export class FiltrosService {

  constructor(private http: Http) { }

}
