import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { DataService } from "../../data.service";
import { Observable } from 'rxjs';
import { IDataChart } from "../../models/data-chart";
import { map } from 'rxjs/operators';
import crossfilter from "crossfilter2/crossfilter";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  controls = ["markdown", "revenues", "margin"];
  selected$: Observable<string>;

  dataList: IDataChart[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.selected$ = this.dataService.selectedControl$;
    console.log(this.selected$);
  }

  onChange(files: IDataChart[]) {
    
    if(files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          // console.log(result);
          const parsedData = result.data.map(obj => ({
            ...obj,
            date: new Date(+obj.year_ref, 0, +obj.week_ref),
            // new Date(year, month, date, hours, minutes, seconds, ms)
          }))
            this.dataService.setData(parsedData);
            setTimeout(() => {
              this.dataService.initData();
              console.log('Data init')
            }, 5000)
        }
      });
    }
   
  }

  changeOption(value: string)  {
    this.dataService.selectControl(value);
    console.log(value);
  }

  resetAll() {
    this.dataService.resetFilters();
  }

}
