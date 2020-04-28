import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDataChart } from "./models/data-chart";

@Injectable({
  providedIn: 'root'
})
export class DataService {

dataSubject: BehaviorSubject<IDataChart[]> = new BehaviorSubject([]);
dataChart$: Observable<IDataChart[]> = this.dataSubject.asObservable();

selectedSubject: BehaviorSubject<string> = new BehaviorSubject("markdown");
selectedControl$: Observable<string> = this.selectedSubject.asObservable();

constructor() { }

selectControl(control: string): void {
  this.selectedSubject.next(control);
}  

setData(data: IDataChart[]): void {
  this.dataSubject.next(data);
}  

}
