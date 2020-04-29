import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DataService } from "../../data.service";
import { Observable } from "rxjs";
import { IDataChart } from "../../models/data-chart";

import { SubSink } from "subsink";

import * as dc from "dc";
import * as d3 from "d3";
import { LineChart } from "dc";
import crossfilter from "crossfilter2/crossfilter";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("line") line: ElementRef;
  lineChart: LineChart;

  data: IDataChart[] = [];
  crossFilter = crossfilter(this.data);

  selected$: Observable<string>;

  private subs = new SubSink();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.selected$ = this.dataService.selectedControl$;
    this.subs.sink = this.dataService.dataChart$.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  ngAfterViewInit(): void {
    this.initLineChart();
    this.changeFilter();
  }

  /**
   * Init PieChart
   */
  initLineChart() {
    if (this.data.length > 0) {
      this.lineChart = dc.lineChart(this.line.nativeElement);
      const crossFilter = crossfilter(this.data);
      const categoryDimension = crossFilter.dimension((data) =>
        d3.timeWeek(data.date)
      );
      const categoryGroupSum = categoryDimension
        .group()
        .reduceSum((data) => data.markdown);

      this.lineChart
        .width(1000)
        .height(400)
        .margins({ top: 10, right: 10, bottom: 20, left: 40 })
        .dimension(categoryDimension)
        .group(categoryGroupSum)
        .transitionDuration(500)
        .elasticY(true)
        .x(d3.scaleTime())
        .elasticX(true)
        .xUnits(d3.timeWeeks)
        .render();
    }
  }

  changeFilter() {
    this.subs.sink = this.dataService.selectedControl$.subscribe((control) => {
      this.lineChart.group().reduceSum((data) => data[control]);
      this.lineChart.redraw();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
