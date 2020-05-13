import { Component, OnInit } from "@angular/core";
import * as Papa from "papaparse";
import { DataService } from "../../data.service";
import { Observable } from "rxjs";
import { IDataChart } from "../../models/data-chart";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  controls = ["markdown", "revenues", "margin"];
  selected$: Observable<string>;

  selectedCategories$: Observable<Array<string>>;
  selectedDateRange$: Observable<Array<string>>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.selected$ = this.dataService.selectedControl$;

    this.selectedCategories$ = this.dataService.filters$;
    this.selectedDateRange$ = this.dataService.dateRange$;
  }

  onChange(files: IDataChart[]) {
    if (files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((obj) => ({
            ...obj,
            date: new Date(+obj.year_ref, 0, +obj.week_ref * 7 - 7),
            // new Date(year, month, date)
          }));
          this.dataService.setData(parsedData);
        },
      });
    }
  }

  changeOption(value: string) {
    this.dataService.selectControl(value);
  }

  resetAll() {
    this.dataService.resetFilters();
  }
}
