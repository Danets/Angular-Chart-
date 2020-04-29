import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDataChart } from "./models/data-chart";

import crossfilter from "crossfilter2/crossfilter";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  crossFilter = crossfilter();


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
    this.crossFilter.add(data)
  })
}

resetFilters() {
  this.selectedSubject.next("");
}

}
