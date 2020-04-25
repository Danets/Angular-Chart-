import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'piechart'},
  { path: 'piechart', component: PieChartComponent },
  { path: 'linechart', component: LineChartComponent },
  { path: '**', redirectTo: 'piechart' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
