import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDataChart } from "./models/data-chart";

import * as dc from "dc";
import * as d3 from "d3";
import { PieChart, LineChart } from "dc";
import crossfilter from "crossfilter2/crossfilter";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  crossFilter = crossfilter();

sorceData: IDataChart[] = [];

dataSubject: BehaviorSubject<IDataChart[]> = new BehaviorSubject([]);
dataChart$: Observable<IDataChart[]> = this.dataSubject.asObservable();

selectedSubject: BehaviorSubject<string> = new BehaviorSubject("markdown");
selectedControl$: Observable<string> = this.selectedSubject.asObservable();

constructor() { 
  this.initData();
}

selectControl(control: string): void {
  this.selectedSubject.next(control);
}  

setData(data: IDataChart[]): void {
  this.dataSubject.next(data);
}

initData() {
  this.dataChart$.subscribe(data => {
    this.crossFilter.remove();
    this.crossFilter.add(data);
    dc.redrawAll();
  })
}

resetFilters() {
  this.selectedSubject.next("");
}

}
