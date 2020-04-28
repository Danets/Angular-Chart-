import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { DataService } from "../../data.service";
import { Observable } from 'rxjs';
import { IDataChart } from "../../models/data-chart";

import * as dc from 'dc';
import * as d3 from 'd3';
import { LineChart } from 'dc';
import crossfilter from 'crossfilter2/crossfilter';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("line") line: ElementRef;

  lineChart: LineChart;

  data: IDataChart[] = [];
  crossFilter = crossfilter(this.data);

  selected$: Observable<string>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { 
    this.selected$ = this.dataService.selectedControl$;
    this.dataService.dataChart$.subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  ngAfterViewInit(): void {
    this.initPieChart();
  }

  ngOnDestroy(): void {

  }

  initPieChart() {
    if (this.data.length > 0) {
    this.lineChart = dc.lineChart(this.line.nativeElement);
    const crossFilter = crossfilter(this.data);
    const categoryDimension = crossFilter.dimension(data => +data.week_ref);
    const categoryGroupSum = categoryDimension.group().reduceSum(data => data.markdown);
    categoryGroupSum.all();

    this.lineChart
   .width(800)
   .height(300)
   .x(d3.scaleLinear())
   .brushOn(false)
   .yAxisLabel("Count")
   .xAxisLabel("Week")
   .dimension(categoryDimension)
   .group(categoryGroupSum)
  //  .legend(dc.legend())
  .render();
  
  }
}

}
