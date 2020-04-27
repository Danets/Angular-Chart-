import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDataChart } from "./models/data-chart";

@Injectable({
  providedIn: 'root'
})
export class DataService {

sourceData = new BehaviorSubject([]);
dataChart$: Observable<IDataChart[]> = this.sourceData.asObservable();

selectedData = new BehaviorSubject("markdown");
selectedControl$: Observable<string> = this.selectedData.asObservable();

constructor() { }

selectControl(control: string): void {
  this.selectedData.next(control);
}  

setData(data: IDataChart[]): void {
  this.sourceData.next(data);
}  

}
