import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DataService } from "../../data.service";

import { SubSink } from "subsink";

import * as dc from "dc";
import * as d3 from "d3";
import { LineChart } from "dc";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild("line") line: ElementRef;
  private lineChart: LineChart;

  private subs = new SubSink();

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.initLineChart();
    this.initData();
    this.changeFilter();
  }

  /**
   * Init LineChart
   */

  initLineChart() {
    this.lineChart = dc.lineChart(this.line.nativeElement);
    const categoryDimension = this.dataService.lineDimension;
    const categoryGroupSum = this.dataService.lineGroupSum;

    this.lineChart
      .width(500)
      .height(400)
      .margins({ top: 10, right: 10, bottom: 20, left: 100 })
      .dimension(categoryDimension)
      .group(categoryGroupSum)
      .transitionDuration(500)
      .elasticY(true)
      .x(d3.scaleTime())
      .elasticX(true)
      .xUnits(d3.timeWeeks)
      .on("filtered", (chart) => {
        const filters = chart.filters();
        chart.selectAll(".selection").classed("selected", (d) => {
          return filters.includes(d);
        });
        this.dataService.setDateRange(filters);
      })
      .render();
  }

  initData() {
    this.subs.sink = this.dataService.dataChart$.subscribe((data) => {
      this.lineChart.redraw();
    });
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
