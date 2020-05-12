import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IDataChart } from "./models/data-chart";

import * as dc from "dc";
import * as d3 from "d3";
import crossfilter from "crossfilter2/crossfilter";
import { Crossfilter } from "crossfilter2";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private crossFilter: Crossfilter<IDataChart> = crossfilter();
  pieDimension = this.crossFilter.dimension((data) => data.item_category);
  pieGroupSum = this.pieDimension.group().reduceSum((data) => data.markdown);
  lineDimension = this.crossFilter.dimension((data) => d3.timeWeek(data.date));
  lineGroupSum = this.lineDimension.group().reduceSum((data) => data.markdown);

  /**
   *  HERE IS DATA
   */

  dataSubject: BehaviorSubject<IDataChart[]> = new BehaviorSubject([]);
  dataChart$: Observable<IDataChart[]> = this.dataSubject.asObservable();

  setData(data: IDataChart[]): void {
    this.dataSubject.next(data);
  }

  selectedSubject: BehaviorSubject<string> = new BehaviorSubject("markdown");
  selectedControl$: Observable<string> = this.selectedSubject.asObservable();

  selectControl(control: string): void {
    this.selectedSubject.next(control);
  }

  constructor() {
    this.initData();
  }

  initData() {
    this.dataChart$.subscribe((data) => {
      this.resetFilters();
      this.crossFilter.remove();
      this.crossFilter.add(data);
    });
  }

  resetFilters() {
    this.pieDimension.filterAll();
    this.lineDimension.filterAll();
    dc.filterAll();
    dc.redrawAll();
  }
}
