import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

const material = [
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
]

@NgModule({
  imports: [...material],
  exports: [...material],
})
export class MaterialModule { }