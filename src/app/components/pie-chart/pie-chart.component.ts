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
import { PieChart } from "dc";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild("pie") pie: ElementRef;
  private pieChart: PieChart;

  selectedCategories = [];

  private subs = new SubSink();

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.initPieChart();
    this.initData();
    this.changeFilter();
  }

  /**
   * Init PieChart
   */

  initPieChart() {
    this.pieChart = dc.pieChart(this.pie.nativeElement);
    const categoryDimension = this.dataService.pieDimension;
    const categoryGroupSum = this.dataService.pieGroupSum;

    this.pieChart
      .width(500)
      .height(400)
      .dimension(categoryDimension)
      .group(categoryGroupSum)
      .legend(dc.legend())
      //   .on('filtered', function(chart) {
      //     chart.filter(null)
      //         .filter([chart.filters()])
      //         .redrawGroup();
      // })
      .render();
  }

  initData() {
    this.subs.sink = this.dataService.dataChart$.subscribe((data) => {
      this.pieChart.redraw();
    });
  }

  changeFilter() {
    this.subs.sink = this.dataService.selectedControl$.subscribe((control) => {
      this.pieChart.group().reduceSum((data) => data[control]);
      this.pieChart.redraw();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
