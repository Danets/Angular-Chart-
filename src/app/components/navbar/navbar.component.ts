import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { DataService } from "../../data.service";
import { Observable } from 'rxjs';
import { IDataChart } from "../../models/data-chart";
import { map } from 'rxjs/operators';

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
          console.log(result);
          // this.dataList = result.data.slice(0, 10);
          this.dataService.setData(result.data);
          // this.dataService.dataChart$.pipe(
          //   map(data => {
          //     console.log(data);
          //   })
          // )
          // .subscribe(data => this.dataList = data);
          // console.log(`DataList: ${this.dataList}`);
        }
      });
    }
    // if(files[0]) {
    //   this.dataService.setData(files);
    // }
  }

  changeOption(value: string)  {
    this.dataService.selectControl(value);
    console.log(value);
  }

}
