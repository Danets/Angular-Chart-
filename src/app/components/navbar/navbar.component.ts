import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  controls = ["markdown", "revenues", "margin"];
  selected = "markdown";

  dataList: any[];

  constructor() { }

  ngOnInit(): void {
  }

  onChange(files: File[]) {
    
    if(files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result);
          this.dataList = result.data.slice(0, 10);
        }
      });
    }
  }

}
