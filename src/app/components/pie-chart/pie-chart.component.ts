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
import { PieChart } from "dc";
import crossfilter from "crossfilter2/crossfilter";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("pie") pie: ElementRef;
  pieChart: PieChart;
  // data$: Observable<IDataChart[]>;
  data: IDataChart[] = [];
  crossFilter = crossfilter();

  selected$: Observable<string>;

  private subs = new SubSink();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.data$ = this.dataService.dataChart$;
    this.selected$ = this.dataService.selectedControl$;
    this.subs.sink = this.dataService.dataChart$.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
    // this.crossFilter.add(this.data);
  }

  ngAfterViewInit(): void {
    this.initPieChart();
    this.changeFilter();
  }

  /**
   * Init PieChart
   */

  initPieChart() {
      this.pieChart = dc.pieChart(this.pie.nativeElement);
      const crossFilter = crossfilter(this.data);
      const categoryDimension = crossFilter.dimension(
        (data) => data.item_category
      );
      const categoryGroupSum = categoryDimension
        .group()
        .reduceSum((data) => data.markdown);

      this.pieChart
        .width(800)
        .height(300)
        .dimension(categoryDimension)
        .group(categoryGroupSum)
        .legend(dc.legend())
        .render();
  }

  changeFilter() {
    this.subs.sink = this.dataService.selectedControl$.subscribe((control) => {
      if (control === "") {
        this.pieChart.group().reduceSum((data) => data.markdown);
      } else {
        this.pieChart.group().reduceSum((data) => data[control]);
      }
      this.pieChart.redraw();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
