import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { DataService } from "../../data.service";
import { Observable } from 'rxjs';
import { IDataChart } from "../../models/data-chart";

import * as dc from 'dc';
import { PieChart } from 'dc';
import * as crossfilter from 'crossfilter2';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [DataService],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("pie") pie: ElementRef;

  pieChart: PieChart;
  crossFilter: any;

  data$: Observable<IDataChart[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { 
    this.data$ = this.dataService.dataChart$;
  }

  ngAfterViewInit(): void {
    this.pieChart = dc.pieChart(this.pie.nativeElement);
    this.crossFilter = crossfilter();
    this.initPieChart();
  }

  ngOnDestroy(): void {

  }

  initPieChart() {
    const categoryDimension = this.crossFilter.dimension(data => data.item_category);
    const categoryGroupSum = categoryDimension.group().reduceSum(data => data.markdown);
    this.pieChart
   .width(800)
   .height(300)
   .dimension(categoryDimension)
   .group(categoryGroupSum)
   .render();
  }

}
