import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { DataService } from "../../data.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  controls = ["markdown", "revenues", "margin"];
  selected$: Observable<string>;

  dataList: any[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.selected$ = this.dataService.selectedControl$;
  }

  onChange(files: File[]) {
    
    if(files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result);
          // this.dataList = result.data.slice(0, 10);
          this.dataService.setData(result.data);
        }
      });
    }
  }

  changeOption(value: string)  {
    this.dataService.selectControl(value);
    console.log(value);
  }

}
