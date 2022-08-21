import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const modules = [
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class MaterialModule {}
